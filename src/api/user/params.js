const userService = require('../../services/user');

const checkUser = async (req, res, next, id) => {
    await userService
        .findOne({ id })
        .then(function (user) {
            if (!user) {
                return res.sendStatus(404);
            }
            req.body.user = user;
            console.log(req.body.user);
            return next();
        })
        .catch(next);
};

module.exports = {
    checkUser,
};
