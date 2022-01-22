const {User} = require("../models")

async function findOne(condition) {
    return await User.findOne({ where: { ...condition } })
}

async function create(user) {
    return await User.create(user);
}

module.exports = {findOne, create}