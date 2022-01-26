const express = require("./express");
const helmetLoader = require("./helmet");

module.exports = async (app) => {
  await helmetLoader(app);
  await express(app);
};
