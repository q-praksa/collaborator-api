const userService = require('../../services/user');

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
    return res.status(400).send('Email and password cannot be empty');
  }

  const { email, password, ...optionalFields } = req.body;
  const user = await userService.findOne({ email });

  if (user) {
    return res.status(409).send('Email already taken');
  }

  const payload = {
    email,
    password,
    ...optionalFields,
  };

  try {
    const createdUser = await userService.addNewUser(payload);
    const { password, ...retVal } = createdUser.dataValues;
    res.status(201).send(retVal);
  } catch {
    res.status(500).send();
  }
};

const deleteUser = async (req, res) => {
  if (!req.body || !req.body.id) {
    return res.status(400).send('User ID must be passed to the request');
  }

  const { id } = req.body;
  const { isAdmin } = req;
  if (!isAdmin) {
    return res.status(403).send('Forbidden');
  }

  const user = await userService.findOne({ id });

  if (!user) {
    return res.status(406).send('User with that id does not exists');
  }

  const payload = {
    id,
  };

  try {
    await userService.deleteUser(payload);
    res.status(200).send('Removed');
  } catch {
    res.status(500).send();
  }
};

const getUserById = async (req, res) => {
  if (!req.params) {
    return res.status(400).send('Missing ID param');
  }

  if (!req.body.user) {
    return res.status(400).send('User not found');
  }

  const user = req.body.user;

  const { password, ...retVal } = user.dataValues;
  res.status(200).send(retVal);
};

const updateUser = async (req, res) => {
  if (!req.body || !req.body.id) {
    return res.status(400).send('User ID is required');
  }

  const { id, ...updateFields } = req.body;
  const foundUser = await userService.findOne({ id });

  if (!foundUser) {
    return res.status(404).send('User does not exist');
  }

  const payload = {
    id,
    values: updateFields,
  };

  try {
    await userService.updateUser(payload);
    res.status(200).send('User updated');
  } catch {
    res.status(500).send();
  }
};

module.exports = { getAllUsers, addUser, deleteUser, getUserById, updateUser };
