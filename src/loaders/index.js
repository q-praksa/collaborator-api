const express = require("./express");
const helmetLoader = require("./helmet");
const pagination = require("./pagination");

module.exports = async (app) => {
  await helmetLoader(app);
  await express(app);
  await pagination(app);
};
