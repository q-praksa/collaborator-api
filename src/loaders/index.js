const modelDefiners = require('./modelDefiners');
const express = require('./express');
const sequelize = require('./sequelize');
 
module.exports = async ({ expressApp, sequelize: db }) => {
    const {sequelize: connectedDb} = await sequelize(db);
    console.log({connectedDb})
    await express({app: expressApp});

    await modelDefiners({sequelize: connectedDb});
}