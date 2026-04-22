const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema(
  {
    stars: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },

    reviewText: {
      type: String,
      trim: true,
      maxlength: 500,
    },

    author: {
      type: String,
      required: true,
    },

    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true, // adds createdAt, updatedAt
  },
);

module.exports = mongoose.model("PlatformReview", reviewSchema);
