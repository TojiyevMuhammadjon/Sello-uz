const { Model, DataTypes, Sequelize } = require("sequelize");
const sequelize = require("../database/index");

class Admins extends Model {}

Admins.init(
  {
    id: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: "admins",
    createdAt: "created_at",
    updatedAt: "updated_at",
    freezeTableName: true,
    autoIncrement: true,
  }
);

module.exports = Admins;
