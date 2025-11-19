import mongoose from "mongoose";

const websiteReviewSchema = new mongoose.Schema({
  author: {
    type: String,
    required: true
  },
  reviewText: {
    type: String,
    required: true
  },
  stars: {
    type: Number,
    min: 1,
    max: 5,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model("WebsiteReview", websiteReviewSchema);
