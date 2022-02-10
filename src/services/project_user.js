const { Project_User } = require('../models');
const { v4: uuidv4 } = require('uuid');

async function create(project) {
  return await Project_User.create(project);
}

async function addNewProjectUser({ projectId, userId }) {
  try {
    const createdProjectUser = await create({
      id: uuidv4(),
      projectId,
      userId,
    });
    return createdProjectUser;
  } catch (error) {
    throw new Error('ADD_NEW_PROJECT_USER_FAILED');
  }
}

module.exports = {
  create,
  addNewProjectUser,
};
