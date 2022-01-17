const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {

    sequelize.define('user', {id: {
        type: DataTypes.UUID,
        allowNull: false,
        primaryKey: true, 
    },
    username: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    password: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    role: {
        type: DataTypes.TEXT,
        defaultValue: 'user',
    },        
    }
)}