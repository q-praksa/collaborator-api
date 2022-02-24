const { Project, User } = require('../models');
const { v4: uuidv4 } = require('uuid');

async function findAll() {
    return await Project.findAll();
}

async function findOne(condition) {
    return await Project.findOne({ where: { ...condition } });
}

async function create(project) {
    return await Project.create(project);
}

async function deleteProject(id) {
    return await Project.destroy({ where: id });
}

async function addNewProject({ projectName, ...fields }) {
    try {
        const createdProject = await create({
            ...fields,
            id: uuidv4(),
            projectName,
        });
        return createdProject;
    } catch (error) {
        throw new Error('ADD_NEW_PROJECT_FAILED');
    }
}

async function updateProject({ id, values }) {
    return await Project.update(values, { where: { id } });
}

async function findAllProjectsByUserId(userId) {
    const projects = await User.findOne({
        where: { id: userId },
        attributes: ['id', 'fullname'],
        include: [
            {
                model: Project,
            },
        ],
    });
    return projects;
}

module.exports = {
    findOne,
    create,
    findAll,
    addNewProject,
    deleteProject,
    updateProject,
    findAllProjectsByUserId,
};
