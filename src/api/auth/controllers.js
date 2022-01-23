const userService = require('../../services/user');
const authService = require('../../services/auth');
const refreshTokenService = require('../../services/refreshToken');

const signUp = async (req, res) => {
    if (!req.body || !req.body.email || !req.body.password) {
        return res.status(400).send('Email and password cannot be empty');
    }

    const {email, password} = req.body; 
    const user = await userService.findOne({email});

    if (user) {
        // TODO: Research, maybe not a good practice to send 409
        // Security risk: server shouldn't expose which email addresses are taken?
        return res.status(409).send('Email already taken');
    }

    const payload = {
        email,
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
}

const logIn = async (req, res) => {
    if (!req.body || !req.body.email || !req.body.password) {
        return res.status(400).send('Email and password cannot be empty');
    }

    let user;

    try {
        user = await userService.findOne({email: req.body.email});
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
}

const logOut = async (req, res) => {
    if (!req.body.refreshToken) {
        return res.sendStatus(200);
    }
    try {
        await authService.logOut(req.body.refreshToken);
        res.sendStatus(200);
    } catch(e) {
        console.error({e})
        res.sendStatus(500);
    }
}

const refreshToken = async (req, res) => {
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
}

module.exports = {signUp, logIn, logOut, refreshToken}