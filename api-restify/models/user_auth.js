const mongoose = require('mongoose');

const user_auth = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        trim: true
    },
    password: {
        type: String,
        required: true
    }
});

const _user_auth = mongoose.model("user_auth", user_auth);

module.exports = _user_auth;