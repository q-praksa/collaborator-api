const clientService = require('../../services/client');

const checkClient = async (req, res, next, id) => {
  const foundClient = await clientService.findOne({ id });

  if (!foundClient) {
    return res.sendStatus(404);
  }
  req.body.client = foundClient;
  next();
};

module.exports = {
  checkClient,
};
