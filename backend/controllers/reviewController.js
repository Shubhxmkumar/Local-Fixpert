// controllers/reviewController.js
const reviewService = require("../services/reviewService");

const rateBooking = async (req, res, next) => {
  try {
    const { rating, review } = req.body;
    const result = await reviewService.rateBooking(req.params.id, rating, review);
    res.json(result);
  } catch (err) {
    next(err);
  }
};

const getExpertReviews = async (req, res, next) => {
  try {
    const reviews = await reviewService.getExpertReviews(req.params.expertId);
    res.json({ success: true, reviews });
  } catch (err) {
    next(err);
  }
};

const addPlatformReview = async (req, res, next) => {
  try {
    const review = await reviewService.addPlatformReview(req.body);
    res.status(201).json(review);
  } catch (err) {
    next(err);
  }
};

const getPlatformReviews = async (req, res, next) => {
  try {
    const reviews = await reviewService.getPlatformReviews();
    res.json(reviews);
  } catch (err) {
    next(err);
  }
};

const getPlatformReviewAverage = async (req, res, next) => {
  try {
    const result = await reviewService.getPlatformReviewAverage();
    res.json(result);
  } catch (err) {
    next(err);
  }
};

const deletePlatformReview = async (req, res, next) => {
  try {
    const result = await reviewService.deletePlatformReview(req.params.id);
    res.json(result);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  rateBooking,
  getExpertReviews,
  addPlatformReview,
  getPlatformReviews,
  getPlatformReviewAverage,
  deletePlatformReview,
};
