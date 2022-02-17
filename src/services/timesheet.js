const { Timesheet } = require("../models");
const { v4: uuidv4 } = require("uuid");
const { Op } = require("sequelize");

async function findAll() {
  return Timesheet.findAll();
}

async function createNew(timesheetObject) {
  const newTimesheet = { ...timesheetObject, id: uuidv4() };
  return Timesheet.create(newTimesheet);
}

async function deleteExisting(id) {
  return Timesheet.destroy({ where: { id } });
}

async function findOne(id) {
  return Timesheet.findOne({ where: { id } });
}

async function findByDate(dateString) {
  return Timesheet.findAll({
    where: {
      createdAt: {
        [Op.startsWith]: dateString,
      },
    },
  });
}

async function updateExisting({ id, values }) {
  return Timesheet.update(values, { where: { id } });
}

module.exports = {
  findAll,
  createNew,
  deleteExisting,
  findOne,
  updateExisting,
  findByDate,
};
