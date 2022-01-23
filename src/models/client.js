"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Client extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Client.hasMany(models.Project);
    }
  }
  Client.init(
    {
      id: {
        type: DataTypes.UUID,
        validate: {
          notEmpty: true,
        },
        allowNull: false,
        primaryKey: true,
      },
      status: {
        type: DataTypes.TEXT,
        defaultValue: "Active",
      },
      companyName: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      img: {
        type: DataTypes.TEXT,
      },
      CEO: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      region: {
        type: DataTypes.TEXT,
      }
    },
    {
      sequelize,
      modelName: "client",
    }
  );
  return Client;
};
