const timesheetService = require("../../services/timesheet");

async function getAll(req, res) {
  try {
    const timesheets = await timesheetService.findAll();
    res.json(timesheets);
  } catch (err) {
    console.log("Failed to fetch timesheet data.");
    res.sendStatus(500);
  }
}

async function addTimesheet(req, res) {
  if (!req.body || !req.body.timeSpent || !req.body.description) {
    return res
      .status(400)
      .send("Bad request, time spent and dsecription cannot be empty.");
  }

  const newTimesheet = await timesheetService.createNew(req.body);

  try {
    res.json(newTimesheet);
  } catch (err) {
    console.log("Failed to post new timesheet data.");
    res.sendStatus(500);
  }
}

async function deleteTimesheet(req, res) {
  if (!req.body.id) {
    res
      .status(400)
      .send(
        "Bad request, please send id of timesheet that you want to be deleted."
      );
  }

  const foundTimesheet = await timesheetService.findOne(req.body.id);
  if (!foundTimesheet) {
    res.status(404).send("There is no item under given id.");
  }

  try {
    const deletedTimesheet = await timesheetService.deleteExisting(req.body.id);
    res.json(deletedTimesheet);
  } catch (err) {
    console.log("Failed to delete timesheet item.");
    res.sendStatus(500);
  }
}

async function updateTimesheet(req, res) {
  if (!req.body) {
    return res
      .status(400)
      .send("Bad request, please send item you want updated.");
  }

  const { id, updateFields } = req.body;
  const foundTimesheet = await timesheetService.findOne(id);
  if (!foundTimesheet) {
    return res.status(404).send("There is no item under given id.");
  }

  const payload = { id, values: updateFields };

  const updatedTimesheet = await timesheetService.updateExisting(payload);

  try {
    res.status(200).json(updatedTimesheet);
  } catch (err) {
    console.log("Failed to update timesheet item.");
    res.sendStatus(500);
  }
}

async function getTimesheetByDate(req, res) {
  if (!req.params) {
    return res.status(400).send("Missing Date param");
  }

  if (!req.body.timesheet) {
    return res.status(400).send("Timesheet not found");
  }
  const timesheet = req.body.timesheet;

  res.status(201).send(timesheet);
}

module.exports = {
  getAll,
  addTimesheet,
  deleteTimesheet,
  updateTimesheet,
  getTimesheetByDate,
};
