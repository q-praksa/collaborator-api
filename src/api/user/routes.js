const { Router } = require("express");
const controller = require("./controllers");
const { authenticateToken } = require("../auth/middlewares");
const route = Router();

module.exports = (app) => {
  app.use("/users", route);

  route.get("/", /*authenticateToken,*/ controller.getAllUsers);
  route.post("/", /*authenticateToken,*/ controller.addUser);
  route.delete("userId", controller.deleteUser);
};
