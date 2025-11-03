const mongoose = require("mongoose");

const serviceSchema = new mongoose.Schema({
  title: String,
  description: String,
  category: {
    type: String,
    enum: ["plumbing", "electrical", "cleaning", "repair", "other"],
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  provider: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  image: String,
  location: String,
  ratings: [
    {
      user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
      rating: Number,
      comment: String,
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Service", serviceSchema);
