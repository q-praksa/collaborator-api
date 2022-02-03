"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Timesheet extends Model {
    static associate(models) {
      Timesheet.belongsTo(models.User);
      Timesheet.belongsTo(models.Project);
    }
  }
  Timesheet.init(
    {
      id: {
        type: DataTypes.UUID,
        validate: {
          notEmpty: true,
        },
        allowNull: false,
        primaryKey: true,
      },
      timeSpent: {
        type: DataTypes.NUMBER,
        allowNull: false,
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Timesheet",
    }
  );
  return Timesheet;
};
