const clientService = require('../../services/client');

const checkClient = async (req, res, next, id) => {
  await clientService
    .findOne({ id })
    .then(function (client) {
      if (!client) {
        return res.sendStatus(404);
      }
      req.body.client = client;
      return next();
    })
    .catch(next);
};

module.exports = {
  checkClient,
};
