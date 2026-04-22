// routes/reviewRoutes.js
const express = require("express");
const router = express.Router();
const reviewController = require("../controllers/reviewController");
const { validateObjectId, validatePlatformReview } = require("../middlewares/validationMiddleware");

// ── Expert / Booking Reviews ─────────────────────────────────────────────────

// POST   /bookservice/rate/:id          → Rate a completed booking
router.post("/rate/:id", validateObjectId, reviewController.rateBooking);

// GET    /bookservice/reviews/:expertId → Get all reviews for an expert
router.get("/reviews/:expertId", reviewController.getExpertReviews);

// ── Platform (Website) Reviews ───────────────────────────────────────────────

// POST   /review/review-insert          → Add a platform review
router.post("/review-insert", validatePlatformReview, reviewController.addPlatformReview);

// GET    /review/reviews                → Get all platform reviews
router.get("/reviews", reviewController.getPlatformReviews);

// GET    /review/reviews/average        → Get average platform rating
// NOTE: must be defined BEFORE /review/:id to avoid collision
router.get("/reviews/average", reviewController.getPlatformReviewAverage);

// DELETE /review/review/:id             → Delete a platform review
router.delete("/review/:id", validateObjectId, reviewController.deletePlatformReview);

module.exports = router;
