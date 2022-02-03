const timesheetService = require("../../services/timesheet");

const checkTimesheet = async (req, res, next, date) => {
  const dateArr = date.split("-");
  const withZero = dateArr.map((num) => {
    if (parseInt(num) < 10) {
      return "0" + num;
    }
    return num;
  });
  const withZeroReverse = withZero.reverse().join("-");

  await timesheetService
    .findAllWhere(withZeroReverse)
    .then((timesheet) => {
      if (!timesheet) {
        return res.status(404).send("something wrong with date request");
      }
      req.body.timesheet = timesheet;
      console.log(req.body.timesheet);
      return next();
    })
    .catch((err) => {
      res.send("Error something wrong with date request");
    });
};

module.exports = {
  checkTimesheet,
};
