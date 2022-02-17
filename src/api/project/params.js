const projectService = require('../../services/project');

const checkProject = async (req, res, next, id) => {
  const foundProject = await projectService.findOne({ id });
  if (!foundProject) {
    return res.sendStatus(404);
  }
  req.body.project = foundProject;
  next();
};

module.exports = {
  checkProject,
};
