const { Router } = require('express');

const controller = require('./controllers');

const route = Router();

module.exports = (app) => {
  app.use('/auth', route);

  route.post('/signup', controller.signUp);

  route.post('/login', controller.logIn);

  route.delete('/logout', controller.logOut);

  route.post('/token', controller.refreshToken);
};
