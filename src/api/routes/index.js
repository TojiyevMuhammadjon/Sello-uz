const Admin = require("./admin.route");
const User = require("./user.route");
const Product = require("./product.route");
const Seller = require("./seller.route");
const Category = require("./category.route");
const Likes = require("./like.route");
const Payment = require("./payment.route");

module.exports = [Admin, User, Product, Seller, Category, Likes, Payment];
