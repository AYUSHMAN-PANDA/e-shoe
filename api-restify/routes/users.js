const errors = require('restify-errors');
const users = require('../models/users');

module.exports = server => {

    // get all users
    server.get('/users', async (req, res, next) => {
        try {
            const found_users = await users.find({});
            res.send(found_users);
            next();
        } catch (err) {
            return next(new errors.InvalidContentError(err))
        };
    });

    //get one user
    server.get('/users/:id', async (req, res, next) => {
        try {
            const found_user = await users.findById(req.params.id);
            res.send(found_user);
            next();
        } catch (err) {
            return next(new errors.ResourceNotFoundError(`No user with the id of ${req.params.id}`))
        };
    });

    //add user
    server.post('/addUser', async (req, res, next) => {

        const user = new users({
            name: req.body.name,
            email: req.body.email,
            role: req.body.role //!! role not working with post request : only getting default value 'user'

            // role update works with put request(update) .. which is okay for design ..default role is user...update it to diff role when reuired
        })
        try {
            const newUser = await user.save();
            res.send(201);
            next();
        } catch (err) {
            next(new errors.InternalError(err));
        }
    });

    //update user details

    server.put('/updateUser/:id', async (req, res, next) => {
        try {
            const found_user = await users.findByIdAndUpdate(req.params.id, req.body);
            res.send(200);
            next();
        } catch (err) {
            return next(new errors.ResourceNotFoundError(`No user with the id of ${req.params.id}`))
        };
    });

    //delete user
    server.del('/delUser/:id', async (req, res, next) => {
        try {
            const found_user = await users.findByIdAndRemove(req.params.id);
            res.send(201);
            next();
        } catch (err) {
            return next(new errors.ResourceNotFoundError(`No user with the id of ${req.params.id}`))
        };
    });

};