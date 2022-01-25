const express = require("./express").appFunction;

module.exports = async (app) => {
  await express(app);
};

console.log(express);
