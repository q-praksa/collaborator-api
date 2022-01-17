
const { Router } = require('express');
const { v4: uuidv4 } = require('uuid');


const route = Router();
module.exports = (app, db) => {
    app.use('/auth', route);

    // route.post(
    //     '/signup', () => {});
    route.get('/', (req, res) => {
        const user = db.models.user.create({id: uuidv4(), username: 'aa', password: 'aa'})
        res.send('works')
    })
}