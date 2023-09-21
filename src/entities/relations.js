const Admins = require("./admin.entity");
const Backet = require("./backet.entity");
const Category = require("./category.entity");
const Products = require("./product.entity");
const Sellers = require("./seller.entity");
const Users = require("./user.entity");

const relations = () => {
  Admins.hasMany(Category, { foreignKey: "admin_id" });
  Category.belongsTo(Admins, { foreignKey: "admin_id" });

  Category.hasMany(Products, { foreignKey: "category_id" });
  Products.belongsTo(Category, { foreignKey: "category_id" });

  Products.belongsTo(Sellers, { foreignKey: "seller_id" });
  Sellers.hasMany(Products, { foreignKey: "seller_id" });

  Backet.belongsTo(Products, { foreignKey: "product_id" });
  Products.hasMany(Backet, { foreignKey: "product_id" });

  Backet.belongsTo(Users, { foreignKey: "user_id" });
  Users.hasMany(Backet, { foreignKey: "user_id" });

  Users.belongsToMany(Products, { through: "user_to_product" });
  Products.belongsToMany(Users, { through: "user_to_product" });

  Users.belongsToMany(Products, { through: "backets" });
  Products.belongsToMany(Users, { through: "backets" });
};

module.exports = relations;
