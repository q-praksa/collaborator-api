const userService = require('../../services/user');

async function isAdmin(req, res, next) {
  const id = req.userId;
  const foundUser = await userService.findOne({ id });
  if (foundUser.role === 'admin') {
    req.isAdmin = 'true';
  }
  next();
}

module.exports = {
  isAdmin,
};
