const { Timesheet } = require("../models");
const { v4: uuidv4 } = require("uuid");
const { Op } = require("sequelize");

async function findAll() {
  return await Timesheet.findAll();
}

async function createNew(timesheetObject) {
  const newTimesheet = { ...timesheetObject, id: uuidv4() };
  return await Timesheet.create(newTimesheet);
}

async function deleteExisting(id) {
  return await Timesheet.destroy({ where: { id } });
}

async function findOne(id) {
  return await Timesheet.findOne({ where: { id } });
}

async function findAllWhere(dateString) {
  return await Timesheet.findAll({
    where: {
      createdAt: {
        [Op.startsWith]: dateString,
      },
    },
  });
}

async function updateExisting({ id, values }) {
  return await Timesheet.update(values, { where: { id } });
}

module.exports = {
  findAll,
  createNew,
  deleteExisting,
  findOne,
  updateExisting,
  findAllWhere,
};
