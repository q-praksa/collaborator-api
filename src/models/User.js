
// module.exports = (sequelize) => {

//     sequelize.define('user', {id: {
//         type: DataTypes.UUID,
//         allowNull: false,
//         primaryKey: true, 
//     },
//     username: {
//         type: DataTypes.TEXT,
//         allowNull: false,
//     },
//     password: {
//         type: DataTypes.TEXT,
//         allowNull: false,
//     },
//     role: {
//         type: DataTypes.TEXT,
//         defaultValue: 'user',
//     },        
//     }
// )}

const { Model } = require('sequelize');


module.exports = (sequelize, DataTypes) => {
  class User extends Model {}

  User.init({
    id: {
      type: DataTypes.UUID,
      validate: {
        notEmpty: true,
      },
      allowNull: false,
      primaryKey: true,
    },
    username: {
        type: DataTypes.TEXT,
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
        defaultValue: 'user',
    }, 
  }, {
    sequelize,
    modelName: 'user'
  });

  User.associate = (models) => {
    // associations can be defined here
  };

  return User;
};