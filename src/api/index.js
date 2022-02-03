const { Router } = require('express');
const auth = require('./auth/routes');
const user = require('./user/routes');
const project = require('./project/routes');
const client = require('./client/routes');

module.exports = () => {
  const app = Router();
  auth(app);
  user(app);
  project(app);
  client(app);

  return app;
};
