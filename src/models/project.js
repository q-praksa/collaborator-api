// id: 1,
//         status: ProjectStatus.active,
//         client: 'Some guy',
//         lead: 'Kim Novak',
//         manager: 'Milos Ilic',
//         teamType: 'Dedicated',
//         startDate: '01-01-2021',
//         endDate: 'N/A',

"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
class Project extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
        // define association here
        Project.belongsToMany(models.User, { through: 'Project_Team' });
        // Project.belongsTo(Client);
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
        status: {
            type: DataTypes.TEXT,
            defaultValue: 'Active',
        },
        teamType: {
            type: DataTypes.TEXT,
            defaultValue: 'Dedicated'
        },
        startDate: {
            type: DataTypes.DATE,
            defaultValue: new Date(),
        },
        endDate: {
            type: DataTypes.DATE
        }
    },
    {
        sequelize,
        modelName: "project",
    }
    );
    return Project;
};
