const { Router } = require('express');
const route = Router();
const controller = require('./controllers');
const { isAdmin } = require('../user/middlewares');
const { authenticateToken } = require('../auth/middlewares');
const { checkClient } = require('../client/params');

module.exports = (app) => {
  app.use('/clients', route);

  route.get('/', authenticateToken, controller.getAllClients);
  route.post('/', authenticateToken, isAdmin, controller.addClient);
  route.delete('/', authenticateToken, isAdmin, controller.deleteClient);
  route.patch('/', authenticateToken, isAdmin, controller.updateClient);
  route.param('id', checkClient);
  route.get('/:id', authenticateToken, controller.getClientById);
};
