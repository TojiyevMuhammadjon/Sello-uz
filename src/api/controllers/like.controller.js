const CustomError = require("../../libs/customError");
const Backet = require("../../entities/backet.entity");
const Products = require("../../entities/product.entity");
const Users = require("../../entities/user.entity");
const likeValidation = require("../validations/like.validation");

const likes = async (req, res, next) => {
  try {
    const user_id = req.user;
    const product_id = req.params?.product_id;
    if (!product_id) throw new CustomError(403, "Invalid product_id");

    const validationError = likeValidation({
      user_id,
      product_id,
    });
    if (validationError) throw new CustomError(400, validationError.message);

    const findProduct = await Products.findByPk(product_id, { logging: false });
    if (!findProduct) throw new CustomError(400, "Product not found");

    const findUser = await Users.findByPk(id, {
      include: [{ model: Products, as: "LikedProducts" }],
    });
    if (!findUser) {
      throw new CustomError(400, "User not found");
    }
    const createLike = await findUser.addProducts([findProduct], {
      logging: false,
    });

    res.status(201).json({ message: "Likes crated", createLike });
  } catch (error) {
    next(error);
  }
};

const getAll = async (req, res, next) => {
  try {
    const id = req.user;
    const likes = await Users.findOne({ where: { id }, logging: false });

    const likedProducts = await likes.getProducts();
    res.status(201).json({ message: "Succes", likedProducts });
  } catch (error) {
    next(error);
  }
};

const backetsControl = async (req, res, next) => {
  try {
    const user_id = req.user;
    const product_id = req.params?.product_id;
    if (!product_id) throw new CustomError(403, "Invalid product_id");

    const validationError = likeValidation({
      user_id,
      product_id,
    });
    if (validationError) throw new CustomError(400, validationError.message);

    const findProduct = await Products.findByPk(product_id, { logging: false });
    if (!findProduct) throw new CustomError(400, "Product not found");

    const newBacket = await Backet.create(
      { user_id, product_id },
      {
        logging: false,
      }
    );

    res.status(201).json({ message: "Backet successfully added", newBacket });
  } catch (error) {
    next(error);
  }
};

const getBackets = async (req, res, next) => {
  try {
    const user_id = req.user;
    const backets = await Backet.findAll({
      where: { user_id },
      include: [Products, Users],
      logging: false,
    });
    res.status(201).json({ message: "Succes", backets });
  } catch (error) {
    next(error);
  }
};

module.exports = { likes, getAll, backetsControl, getBackets };
