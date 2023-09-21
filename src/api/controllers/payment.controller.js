const config = require("config");
const Users = require("../../entities/user.entity");
const stripe = require("stripe")(config.get("stripe_secret_key"));
const sequelize = require("sequelize");
const Products = require("../../entities/product.entity");

// this is payment method
const payment = async (req, res) => {
  try {
    let { amount, id, user_id } = req.body;

    try {
      const paymentIntent = await stripe.paymentIntents.create({
        amount,
        currency: "USD",
        description: "Payment",
        payment_method: id,
        confirm: true,
        // Add a return_url to handle redirect-based payment methods
        return_url: "http://localhost:3000", // Replace with your actual success URL
      });

      const user = await Users.findOne({ where: { id: user_id } });
      console.log(user);
      user.balance = user?.balance + amount;

      console.log(user);

      await user.save();
      console.log("Payment", paymentIntent);
      res.json({
        message: "Payment was successful",
        success: true,
        clientSecret: paymentIntent.client_secret,
      });
    } catch (error) {
      console.error("Error", error);
      res.json({
        message: "Payment Failed",
        success: false,
      });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// this is User payment method

const userPayment = async (req, res) => {
    const { user_id, product_id } = req.body;
    const t = await sequelize.transaction;
  
    try {
      const user = await Users.findOne({ where: { id: user_id } });
      if (!user) return res.status(404).json({ message: "User not found" });
  
      const product = await Products.findOne({ where: { id: product_id } });
  
      if (!product) return res.status(404).json({ message: "Product not found" });
  
      if (user.balance < product.price) {
        // Rollback the transaction and send an error response
        await t.rollback();
        return res.status(400).json({ message: "Balance is out of range" });
      }
  
      // Deduct the product price from the user's balance
      user.balance = user.balance - product.price;
      await user.save({ transaction: t });
  
      // Commit the transaction
      await t.commit();
  
      // Send a success response
      res.status(200).json({ message: "Payment successful" });
    } catch (error) {
      // Handle errors and send an error response
      await t.rollback();
      res.status(500).json({ message: "Payment failed", error: error.message });
    }
  };
  
module.exports = {
  payment,
  userPayment,
};
