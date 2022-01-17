const modelDefiners = require('./modelDefiners');
const express = require('./express');
const sequelize = require('./sequelize');
 
module.exports = async ({ expressApp, sequelize: db }) => {
    await modelDefiners({sequelize: db});
    await sequelize(db);

    await express({app: expressApp, db});

}