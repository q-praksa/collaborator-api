const { Router } = require("express");
const { authenticateToken } = require("../auth/middlewares");
const { isAdmin } = require("../user/middlewares");
const controller = require("./controllers");
const { checkTimesheet } = require("./params");
const route = Router();

module.exports = (app) => {
  app.use("/timesheet", route);
  route.get("/", authenticateToken, controller.getAll);
  route.param("date", checkTimesheet);
  route.get("/:date", authenticateToken, controller.getTimesheetByDate);
  route.post("/", authenticateToken, controller.addTimesheet);
  route.delete("/", authenticateToken, isAdmin, controller.deleteTimesheet);
  route.patch("/", authenticateToken, controller.updateTimesheet);
};
