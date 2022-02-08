const userService = require('../../services/user');

const checkUser = async (req, res, next, id) => {
  const foundUser = await userService.findOne({ id });

  if (!foundUser) {
    return res.sendStatus(404);
  }
  req.body.user = foundUser;
  next();
};

module.exports = {
  checkUser,
};
