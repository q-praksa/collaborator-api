const userService = require("../../services/user");
const { v4: uuidv4 } = require("uuid");
const bcrypt = require("bcrypt");

const getAllUsers = async (req, res) => {
  try {
    const users = await userService.findAll();
    res.json(users);
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
};

const addUser = async (req, res) => {
  if (!req.body || !req.body.email || !req.body.password) {
    return res.status(400).send("Email and password cannot be empty");
  }

  const { email, password } = req.body;
  const user = await userService.findOne({ email });

  if (user) {
    return res.status(409).send("Email already taken");
  }

  const payload = {
    email,
    password,
  };

  try {
    const createdUser = await userService.addNewUser(payload);
    const { password, ...retVal } = createdUser.dataValues;
    res.status(201).send(retVal);
  } catch {
    res.status(500).send();
  }
};

module.exports = { getAllUsers, addUser };
