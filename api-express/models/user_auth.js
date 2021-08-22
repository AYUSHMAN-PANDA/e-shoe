const mongoose = require("mongoose");

const user_auth = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  role: {
    type: String,
    enum: ["viewer", "editor", "admin"],
    default: "viewer",
  },
  email: {
    type: String,
    required: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
  },
});

const _user_auth = mongoose.model("user_auth", user_auth);

module.exports = _user_auth;
