const { Router } = require("express");
const auth = require("./auth/routes");
const user = require("./user/routes");

module.exports = () => {
  const app = Router();
  auth(app);
  user(app);

  return app;
};
