const projectService = require('../../services/project');

const getAllProjects = async (req, res) => {     
    const { isAdmin,userId } = req;    
    if (isAdmin !="true") {        
        try {
            const projectsByUser =await  projectService.findAllProjectsByUserId(userId);            
            res.json(projectsByUser);            
        } catch (error) {
            console.log(error);
            res.sendStatus(500);                      
        }               
        return;
    }    
    
    try {
        const projects = await projectService.findAll();        
        res.json(projects);

    } catch (error) {
        console.log(error);
        res.sendStatus(500);       
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
        const { ...retVal } = createdProject.dataValues;
        res.status(201).send(retVal);
    } catch {
        res.status(500).send();
    }
};

const deleteProject = async (req, res) => {
    if (!req.body || !req.body.id) {
        return res.sendStatus(200);
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
    if (!req.body) {
        return res.status(400).send('Body is required');
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

    const {...retVal}=project.dataValues;
    res.status(201).send(retVal);   
};

module.exports = {
    getAllProjects,
    addProject,
    deleteProject,
    updateProject,
    getProjectById
};
