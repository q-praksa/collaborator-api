const express = require('express');
const loaders = require('./loaders');
const config = require('./config');
require('./models');

let app;

async function startServer() {
    const app = express();

    await loaders({ expressApp: app });

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

module.exports = app;