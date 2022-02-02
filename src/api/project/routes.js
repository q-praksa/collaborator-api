const { Router } = require('express');
const controller = require('./controllers');
const route = Router();
const { authenticateToken } = require('../auth/middlewares');
const { isAdmin } = require('../user/middlewares');
const { checkProject } = require('../project/params');

module.exports = (app) => {
    app.use('/projects', route);
    route.get('/', authenticateToken, isAdmin, controller.getAllProjects);
    route.param('id', checkProject);
    route.get('/:id', authenticateToken, controller.getProjectById);
    route.post('/', authenticateToken, isAdmin, controller.addProject);
    route.delete('/', authenticateToken, isAdmin, controller.deleteProject);
    route.patch('/', authenticateToken, isAdmin, controller.updateProject);
};
