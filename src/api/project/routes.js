const { Router } = require('express');
const controller = require('./controllers');
const route = Router();
const { authenticateToken } = require('../auth/middlewares');
const { isAdmin } = require('../user/middlewares');

module.exports = (app) => {
    app.use('/projects', route);
    route.get('/', authenticateToken, isAdmin, controller.getAllProjects);
    route.post('/', authenticateToken, isAdmin, controller.addProject);
    route.delete('/', authenticateToken, isAdmin, controller.deleteProject);
    route.patch('/', authenticateToken, isAdmin, controller.updateProject);
};
