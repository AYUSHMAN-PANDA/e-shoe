const mongoose = require("mongoose");

const issues = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
    trim: true,
  },
  assignees: {
    type: [String],
  },
  tags: {
    type: [String],
  },
  state: {
    type: String,
    enum: ["open", "assigned", "fixed", "abandoned"],
    default: "open",
  },
  postedBy: {
    type: String,
    required: true,
  },
});

// userSchema.plugin(timestamp);

const Issues = mongoose.model("Issues", issues);

module.exports = Issues;
