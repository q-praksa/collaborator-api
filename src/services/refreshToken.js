const { RefreshToken } = require("../models");

async function findOne(condition) {
  return await RefreshToken.findOne({ where: { ...condition } });
}

async function create(refreshToken) {
  return await RefreshToken.create(refreshToken);
}

async function destroy(condition) {
  return await RefreshToken.destroy({ where: { ...condition } });
}

module.exports = { findOne, create, destroy };
