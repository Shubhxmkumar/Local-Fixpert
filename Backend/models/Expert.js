const mongoose = require("mongoose");

const expertSchema = new mongoose.Schema({
  name: { type: String, required: true },
  service: { type: String, required: true },
  category: { type: String },
  description: { type: String },
  img: { type: String },
  rating: { type: Number, default: 0 },
  experience: { type: String },
  price: { type: Number },
});

module.exports = mongoose.model("Expert", expertSchema);
