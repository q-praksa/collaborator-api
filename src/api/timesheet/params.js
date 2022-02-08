const timesheetService = require("../../services/timesheet");
const dayjs = require("dayjs");

const checkTimesheet = async (req, res, next, date) => {
  const isoDate = dayjs(date).format("YYYY-DD-MM");
  try {
    const timesheet = await timesheetService.findByDate(isoDate);
    if (!timesheet) {
      return res.status(404).send("something wrong with date request");
    }
    req.body.timesheet = timesheet;
    console.log(req.body.timesheet);
    return next();
  } catch (err) {
    res.send("Error something wrong with date request");
  }
};

module.exports = {
  checkTimesheet,
};
