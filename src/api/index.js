const { Router } = require('express');
const auth = require('./auth/routes');

module.exports = () => {
	const app = Router();
	auth(app);

	return app
}