const { Router } = require('express');
const auth = require('./routes/auth');
// const user = require('./routes/user');

module.exports = (db) => {
	const app = Router();
	auth(app, db);
	// user(app);

	return app
}