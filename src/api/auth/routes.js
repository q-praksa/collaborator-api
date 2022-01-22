
const { Router } = require('express');
const userService = require('../../services/user');
const authService = require('../../services/auth');

const route = Router();
module.exports = (app) => {
    app.use('/auth', route);

    route.post(
        '/signup', async (req, res) => {
        if (!req.body || !req.body.username || !req.body.password) {
            res.status(400).send('Username and password cannot be empty');
        }

        const {username, password} = req.body; 
        const user = await userService.findOne({username});

        if (user) {
            res.status(409).send('Username already taken');
            return;
        }

        const payload = {
            username,
            password,
        }

        try {
            const createdUser = await authService.signUp(payload);
            //Don't send hashed password back to the client side
            const {password, ...retVal} = createdUser.dataValues;
            res.status(201).send(retVal);
        } catch {
            res.status(500).send();
        }
    });
}