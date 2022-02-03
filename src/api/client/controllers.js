const clientService = require('../../services/client');

const getAllClients = async (req, res) => {
  try {
    const clients = await clientService.findAll();
    res.status(200).send(clients);
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
};

const addClient = async (req, res) => {
  if (!req.body || !req.body.companyName) {
    return res.status(400).send('Project name cannot be empty');
  }

  const { isAdmin } = req;
  if (!isAdmin) {
    return res.status(403).send('Forbidden');
  }
  const { companyName, ...optionalFields } = req.body;
  const client = await clientService.findOne({ companyName });

  if (client) {
    return res.status(409).send('Client with this name already exsists');
  }

  const payload = {
    companyName,
    ...optionalFields,
  };

  try {
    const createdClient = await clientService.addNewClient(payload);
    const { ...retVal } = createdClient.dataValues;
    res.status(201).send(retVal);
  } catch {
    res.status(500).send();
  }
};

const deleteClient = async (req, res) => {
  if (!req.body || !req.body.id) {
    return res.status(400).send('Client ID must be passed to the request');
  }

  const { isAdmin } = req;
  if (!isAdmin) {
    return res.status(403).send('Forbidden');
  }

  const { id } = req.body;
  const client = await clientService.findOne({ id });
  if (!client) {
    return res.status(406).send('Client does not exists');
  }

  const payload = {
    id,
  };

  try {
    await clientService.deleteClient(payload);
    res.status(200).send('Client removed');
  } catch {
    res.status(500).send();
  }
};

const updateClient = async (req, res) => {
  if (!req.body || !req.body.id) {
    return res.status(400).send('Client ID is required');
  }

  const { isAdmin } = req;
  if (!isAdmin) {
    return res.status(403).send('Forbidden');
  }

  const { id, ...updateFields } = req.body;
  const clientToUpdate = await clientService.findOne({ id });

  if (!clientToUpdate) {
    return res.status(404).send('Client does not exist');
  }

  const payload = {
    id,
    values: updateFields,
  };

  try {
    await clientService.updateClient(payload);
    res.status(200).send('Client updated');
  } catch {
    res.status(500).send();
  }
};

const getClientById = async (req, res) => {
  if (!req.params) {
    return res.status(400).send('Missing ID param');
  }

  if (!req.body.client) {
    return res.status(400).send('Client not found');
  }

  const client = req.body.client;

  const { ...retVal } = client.dataValues;
  res.status(200).send(retVal);
};

module.exports = {
  getAllClients,
  addClient,
  deleteClient,
  updateClient,
  getClientById,
};
