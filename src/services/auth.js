const bcrypt = require('bcrypt');
const userService = require('./user');
const { v4: uuidv4 } = require('uuid');

async function signUp({username, password}) {
    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const createdUser = await userService.create({
            id: uuidv4(),
            username: username,
            password: hashedPassword,
        });
        return createdUser;
    } catch (e) {
        throw new Error('SIGN_UP_FAILED')
    }
}

module.exports = {signUp,}