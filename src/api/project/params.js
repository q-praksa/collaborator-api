const projectService= require('../../services/project');

const checkProject = async (req, res, next, id) => {
    await projectService
        .findOne({ id })
        .then(function (project) {
            if (!project) {
                return res.sendStatus(404);
            }
            req.body.project = project;            
            return next();
        })
        .catch(next);
};

module.exports = {
    checkProject,
};
