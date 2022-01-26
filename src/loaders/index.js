const express = require("./express");
const helmetLoader = require("./helmet");

module.exports = async (app) => {
  await express(app);
  helmetLoader(app);
};
