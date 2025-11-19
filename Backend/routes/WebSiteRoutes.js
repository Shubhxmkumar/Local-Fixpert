import express from "express";
import WebsiteReview from "../models/WebsiteReview.js";

const router = express.Router();

// INSERT REVIEW
router.post("/review-insert", async (req, res) => {
  try {
    const { author, reviewText, stars } = req.body;

    const newReview = new WebsiteReview({
      author,
      reviewText,
      stars
    });

    await newReview.save();

    return res.json({
      status: 1,
      message: "Review added successfully"
    });
  } catch (error) {
    console.error("Insert Review Error:", error);
    return res.json({
      status: 0,
      message: "Failed to insert review"
    });
  }
});

// SHOW ALL REVIEWS
router.get("/review-view", async (req, res) => {
  try {
    const reviewList = await WebsiteReview.find().sort({ createdAt: -1 });

    return res.json({
      status: 1,
      reviewList
    });
  } catch (error) {
    console.error("Fetch Reviews Error:", error);
    return res.json({
      status: 0,
      message: "Failed to fetch reviews"
    });
  }
});

export default router;
