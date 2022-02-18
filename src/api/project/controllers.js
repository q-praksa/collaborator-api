const projectService = require('../../services/project');
const projectUserService = require('../../services/project_user');
const userService = require('../../services/user');

const getAllProjects = async (req, res) => {
    const { isAdmin, userId } = req;
    if (!isAdmin) {
        try {
            const projectsByUser = await projectService.findAllProjectsByUserId(
                userId
            );
            console.log(projectsByUser);
            return res.status(200).json(projectsByUser.dataValues);
        } catch (error) {
            console.log(error);
            return res.status(500).send();
        }
    }

    if (isAdmin == 'true') {
        try {
            const projects = await projectService.findAll();
            res.json(projects);
        } catch (error) {
            console.log(error);
            res.status(500).send();
        }
        return;
    }
};

const addProject = async (req, res) => {
    if (!req.body || !req.body.projectName) {
        return res.status(400).send('Project name cannot be empty');
    }

    const { isAdmin } = req;
    if (!isAdmin) {
        return res.status(403).send('Forbidden');
    }
    const { projectName, ...optionalFields } = req.body;
    const project = await projectService.findOne({ projectName });

    if (project) {
        return res.status(409).send('Project with this name already exsists');
    }

    const payload = {
        projectName,
        ...optionalFields,
    };

    try {
        const createdProject = await projectService.addNewProject(payload);
        const retVal = createdProject.dataValues;
        res.status(201).send(retVal);
    } catch {
        res.status(500).send();
    }
};

const deleteProject = async (req, res) => {
    if (!req.body || !req.body.id) {
        return res.status(400).send('Project ID must be passed to the request');
    }

    const { isAdmin } = req;
    if (!isAdmin) {
        return res.status(403).send('Forbidden');
    }

    const { id } = req.body;
    const project = await projectService.findOne({ id });
    if (!project) {
        return res.status(406).send('Project does not exists');
    }

    const payload = {
        id,
    };

    try {
        await projectService.deleteProject(payload);
        res.status(200).send('Project removed');
    } catch {
        res.status(500).send();
    }
};

const updateProject = async (req, res) => {
    if (!req.body || !req.body.id) {
        return res.status(400).send('Project ID is required');
    }

    const { isAdmin } = req;
    if (!isAdmin) {
        return res.status(403).send('Forbidden');
    }

    const { id, ...updateFields } = req.body;
    const projectToUpdate = await projectService.findOne({ id });

    if (!projectToUpdate) {
        return res.status(404).send('Project does not exist');
    }

    const payload = {
        id,
        values: updateFields,
    };

    try {
        await projectService.updateProject(payload);
        res.status(200).send('Project updated');
    } catch {
        res.status(500).send();
    }
};

const getProjectById = async (req, res) => {
    if (!req.params) {
        return res.status(400).send('Missing ID param');
    }

    if (!req.body.project) {
        return res.status(400).send('Project not found');
    }

    const project = req.body.project;

    const { ...retVal } = project.dataValues;
    res.status(200).send(retVal);
};

const addUsersToProject = async (req, res) => {
    if (!req.body || !req.body.usersIDs) {
        return res.status(400).send('usersIDs field is required');
    }

    if (!req.params) {
        return res.status(400).send('Missing ID param');
    }

    if (!req.body.project) {
        return res.status(400).send('Project not found');
    }

    const { isAdmin } = req;
    if (!isAdmin) {
        return res.status(403).send('Forbidden');
    }

    const project = req.body.project;
    const { usersIDs } = req.body;

    if (usersIDs.length === 0) {
        return res.status(400).send('usersIDs list is empty');
    }

    const retVal = [];
    const lastUserID = usersIDs[usersIDs.length - 1];
    usersIDs.forEach(async (userID) => {
        const payload = {
            projectId: project.id,
            userId: userID,
        };

        const isValidUser = userService.findOne({ id: userID });
        if (!isValidUser) {
            return;
        }

        try {
            const createdProjectUser =
                await projectUserService.addNewProjectUser(payload);
            retVal.push(createdProjectUser);
            if (userID === lastUserID) {
                res.status(200).send(retVal);
            }
        } catch {
            res.status(500).send();
        }
    });
};

module.exports = {
    getAllProjects,
    addProject,
    deleteProject,
    updateProject,
    getProjectById,
    addUsersToProject,
};
