// models/User.js
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({

  name: String,
  email: { type: String, unique: true },
  password: String,
  isCutomer: { type: Boolean, default: true },
  isExpert: { type: Boolean, default: false },
});

module.exports = mongoose.model("User", userSchema);
