const { Client } = require('../models');
const { v4: uuidv4 } = require('uuid');

async function findAll() {
  return await Client.findAll();
}

async function findOne(condition) {
  return await Client.findOne({ where: { ...condition } });
}

async function create(client) {
  return await Client.create(client);
}

async function deleteClient(id) {
  return await Client.destroy({ where: id });
}

async function updateClient({ id, values }) {
  return await Client.update(values, { where: { id } });
}

async function addNewClient({ companyName, ...fields }) {
  try {
    const createdClient = await create({
      ...fields,
      id: uuidv4(),
      companyName,
    });
    return createdClient;
  } catch (error) {
    throw new Error('ADD_NEW_CLIENT_FAILED');
  }
}

module.exports = {
  findAll,
  addNewClient,
  findOne,
  create,
  deleteClient,
  updateClient,
};
