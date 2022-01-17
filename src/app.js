const express = require('express');
const Sequelize = require('sequelize');
const loaders = require('./loaders');
const config = require('./config');

async function startServer() {
    const app = express();
    const sequelize = new Sequelize({
        dialect: 'sqlite',
        storage: './database.sqlite'
    });

    await loaders({ expressApp: app, sequelize });

    app.listen(config.port, () => {
        console.info(`
          ################################################
          🛡️  Server listening on port: ${config.port} 🛡️
          ################################################
        `);
      }).on('error', err => {
        console.error(err);
        process.exit(1);
      });
}

startServer();