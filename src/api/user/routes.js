const { Router } = require("express");
const controller = require("./controllers");
const { authenticateToken } = require("../auth/middlewares");
const { isAdmin } = require("../user/middlewares");
const route = Router();

module.exports = (app) => {
  app.use("/users", route);

  route.get("/", authenticateToken, controller.getAllUsers);
  route.get("/:id", authenticateToken, controller.getUserById);
  route.post("/", authenticateToken, controller.addUser);
  route.delete("/", authenticateToken, isAdmin, controller.deleteUser);
  route.patch("/", authenticateToken, controller.updateUser);
};
