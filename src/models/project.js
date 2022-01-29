'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Project extends Model {
      /**
       * Helper method for defining associations.
       * This method is not a part of Sequelize lifecycle.
       * The `models/index` file will call this method automatically.
       */
      static associate(models) {
        // define association here
        Project.belongsToMany(models.User, { through: models.Project_User });
        Project.belongsTo(models.Client);
        Project.belongsTo(models.User, { foreignKey: 'lead' });
        Project.belongsTo(models.User, { foreignKey: 'manager' });       
        Project.hasMany(models.Timesheet);
      }
    }
    Project.init(
      {
        id: {
          type: DataTypes.UUID,
          validate: {
              notEmpty: true,
          },
          allowNull: false,
          primaryKey: true,
        },
        projectName: {
          type: DataTypes.TEXT,
          validate: {
              notEmpty: true,
          },
          allowNull: true,
        },
        status: {
          type: DataTypes.TEXT,
          defaultValue: 'Active',
        },
        teamType: {
          type: DataTypes.TEXT,
          defaultValue: 'Dedicated',
        },
        startDate: {
          type: DataTypes.DATE,
          defaultValue: new Date(),
        },
        endDate: {
          type: DataTypes.DATE,
        },
      },
      {
        sequelize,
        modelName: 'project',
      }
    );
  return Project;
};
