
const { Router } = require('express');

const route = Router();
module.exports = (app) => {
    app.use('/auth', route);

    // route.post(
    //     '/signup', () => {});
    route.get('/', (req, res) => res.send('works'))
}