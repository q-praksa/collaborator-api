const userService = require("../../services/user");
const jwt = require("jsonwebtoken");

function isAdmin(req, res, next) {
  const authHeader = req.headers["authorization"];
  if (!authHeader) {
    return res.sendStatus(401);
  }

  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.sendStatus(401);
  }

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, async (err, user) => {
    if (err) {
      return res.sendStatus(403);
    }

    const id = req.userId;
    const foundUser = await userService.findOne({ id });
    if (foundUser.role === "admin") {
      req.isAdmin = "true";
    }

    next();
  });
}

module.exports = {
  isAdmin,
};
