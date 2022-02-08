const cors = require('cors');
const express = require('express');
const config = require('../config');
const routes = require('../api');
const { apiRequestLimiter } = require('./rateLimit');

module.exports = (app) => {
  /**
   * Health Check endpoints
   */
  app.use(cors());
  app.use(apiRequestLimiter);
  app.get('/status', (req, res) => {
    res.status(200).end();
  });
  app.head('/status', (req, res) => {
    res.status(200).end();
  });

  app.use(express.json());

  app.use(config.api.prefix, routes());
};
