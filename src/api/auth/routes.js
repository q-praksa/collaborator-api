
const { Router } = require('express');
const userService = require('../../services/user');
const authService = require('../../services/auth');
const refreshTokenService = require('../../services/refreshToken');

const route = Router();

module.exports = (app) => {
    app.use('/auth', route);

    route.post(
        '/signup', async (req, res) => {
        if (!req.body || !req.body.username || !req.body.password) {
            return res.status(400).send('Username and password cannot be empty');
        }

        const {username, password} = req.body; 
        const user = await userService.findOne({username});

        if (user) {
            // TODO: Research, maybe not a good practice to send 409
            // Security risk: server shouldn't expose which usernames are taken?
            return res.status(409).send('Username already taken');
        }

        const payload = {
            username,
            password,
        }

        try {
            const createdUser = await authService.signUp(payload);
            // Don't send hashed password back to the client side
            const {password, ...retVal} = createdUser.dataValues;
            res.status(201).send(retVal);
        } catch {
            res.status(500).send();
        }
    });

    route.post('/login', async (req, res) => {
        if (!req.body || !req.body.username || !req.body.password) {
            return res.status(400).send('Username and password cannot be empty');
        }

        let user;

        try {
            user = await userService.findOne({username: req.body.username});
        } catch(e) {
            return res.status(500).send();
        }

        if (!user) {
            return res.status(404).send('Cannot find user');
        }

        try {
            const {accessToken, refreshToken} = await authService.logIn({user: user.dataValues, password: req.body.password});
            res.status(200).json({accessToken, refreshToken});
        } catch(e) {
            if (e.message === 'INVALID_PASSWORD' || e.message === 'PASSWORD_CHECK_FAILED') {
                return res.status(401).send('Not allowed');
            }
            res.status(500).send();
        }
    });

    route.delete('/logout', async (req, res) => {
        if (!req.body.refreshToken) {
            return res.sendStatus(200);
        }
        try {
            await authService.logOut(req.body.refreshToken);
            res.sendStatus(200);
        } catch(e) {
            res.sendStatus(500);
        }
    });

    route.post('/token', async (req, res) => {
        const refreshToken = req.body.refreshToken;
    
        if (!refreshToken) {
            return res.sendStatus(401);
        }
        const tokenExists = await refreshTokenService.findOne({value: refreshToken})
        if (!tokenExists) {
            return res.sendStatus(403);
        }
        try {
            const accessToken = await authService.refreshToken(refreshToken);
            res.json(accessToken);
        } catch(e) {
            res.sendStatus(403);
        }
    });
}