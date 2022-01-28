const express = require("express");
const loaders = require("./loaders");
const config = require("./config");
require("./models");
const helmetLoader = require("./loaders/helmet");

const app = express();

async function startServer() {
  await loaders(app);

  app
    .listen(config.port, () => {
      console.info(`
          ################################################
          🛡️  Server listening on port: ${config.port} 🛡️
          ################################################
        `);
    })
    .on("error", (err) => {
      console.error(err);
      process.exit(1);
    });
}

startServer();

module.exports = { app };
