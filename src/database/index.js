const { Sequelize } = require("sequelize");
const sequlize = new Sequelize(
  "postgres://postgres:muhammad2959@localhost:5432/sello",
);

module.exports = sequlize;
