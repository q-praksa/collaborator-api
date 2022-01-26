const { Router } = require('express');
const { authenticateToken } = require('../auth/middlewares');
const { isAdmin } = require('../user/middlewares');
const { checkUser } = require('./params');
const controller = require('./controllers');
const route = Router();

module.exports = (app) => {
  app.use('/users', route);

  route.get('/', authenticateToken, isAdmin, controller.getAllUsers);
  route.param('id', checkUser);
  route.get('/:id', authenticateToken, controller.getUserById);
  route.post('/', authenticateToken, controller.addUser);
  route.delete('/', authenticateToken, isAdmin, controller.deleteUser);
  route.patch('/', authenticateToken, controller.updateUser);
};
