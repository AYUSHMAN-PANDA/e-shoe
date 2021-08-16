const mongoose = require('mongoose');
const timestamp = require('mongoose-timestamp');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true
    },
    role: {
        type: String,
        enum: ['user', 'admin', 'editor'],
        default: 'user'
    }
});

userSchema.plugin(timestamp);

const users = mongoose.model("Users", userSchema);

module.exports = users;