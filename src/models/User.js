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
      User.belongsToMany(models.Project, { through: 'Project_Team' });
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
      fullname: {
        type: DataTypes.TEXT,
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
      address: {
        type: DataTypes.TEXT,
      },
      job: {
        type: DataTypes.TEXT,
        defaultValue: "Front-End",
      },
      role: {
        type: DataTypes.TEXT,
        defaultValue: "user",
      },
      skills: {
        type: DataTypes.JSON,
      },
      img: {
        type: DataTypes.TEXT,
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
