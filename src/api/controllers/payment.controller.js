const config = require("config");
const { sequelize } = require("../../entities/user.entity");
const stripe = require("stripe")(config.get("stripe_secret_key"));
const Products = require("../../entities/product.entity");
const Users = require("../../entities/user.entity");
const Sellers = require("../../entities/seller.entity");

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
      user.balance = user?.balance + amount;

      await user.save();
      res.json({
        message: "Payment was successful",
        success: true,
        clientSecret: paymentIntent.client_secret,
      });
    } catch (error) {
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
  const { product_id } = req.params;
  const user_id = req.user;
  const t = await sequelize.transaction();
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

    const seller_id = product.seller_id;

    const seller = await Sellers.findOne({ where: { id: seller_id } });

    seller.balance = seller.balance + product.price;

    await seller.save({ transaction: t });

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

module.exports = userPayment;

module.exports = {
  payment,
  userPayment,
};
