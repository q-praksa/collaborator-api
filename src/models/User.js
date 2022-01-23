"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  User.init(
    {
      id: {
        type: DataTypes.UUID,
        validate: {
          notEmpty: true,
        },
        allowNull: false,
        primaryKey: true,
      },
      email: {
        type: DataTypes.TEXT,
        unique: true,
        validate: {
          notEmpty: true,
        },
        allowNull: false,
      },
      password: {
        type: DataTypes.TEXT,
        validate: {
          notEmpty: true,
        },
        allowNull: false,
      },
      role: {
        type: DataTypes.TEXT,
        defaultValue: "user",
      },
      age: {
        type: DataTypes.INTEGER,
      },
    },
    {
      sequelize,
      modelName: "user",
    }
  );
  return User;
};
