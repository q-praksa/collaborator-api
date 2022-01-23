"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class RefreshToken extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  RefreshToken.init(
    {
      value: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: true,
        },
        allowNull: false,
        primaryKey: true,
      },
      expires: {
        type: DataTypes.DATE,
        defaultValue: new Date(new Date().getTime + 30 * 24 * 60 * 60 * 1000),
      },
    },
    {
      sequelize,
      modelName: "refreshToken",
    }
  );
  return RefreshToken;
};
