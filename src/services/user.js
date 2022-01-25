const { User } = require("../models");
const bcrypt = require("bcrypt");
const { v4: uuidv4 } = require("uuid");

async function findOne(condition) {
  return await User.findOne({ where: { ...condition } });
}

async function create(user) {
  return await User.create(user);
}

async function findAll() {
  return await User.findAll();
}

async function addNewUser({ email, password }) {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const createdUser = await create({
      id: uuidv4(),
      email: email,
      password: hashedPassword,
    });
    return createdUser;
  } catch (e) {
    throw new Error("ADD_NEW_USER_FAILED");
  }
}

async function deleteUser({ id }) {
  return await User.destroy({ where: { id } });
}

async function updateUser({ id, values }) {
  return await User.update(values, { where: { id } });
}
module.exports = {
  findOne,
  create,
  findAll,
  addNewUser,
  deleteUser,
  updateUser,
};
