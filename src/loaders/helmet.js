const helmet = require("helmet");

module.exports = function helmetLoader(app) {
  app.use(helmet());
};
