const mongoose = require("mongoose");

const counterSchema = new mongoose.Schema({
  name: { type: String, required: true },
  seq: { type: Number, default: 4570 }, // 👈 start base
});

module.exports = mongoose.model("Counter", counterSchema);