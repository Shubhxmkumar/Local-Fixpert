// services/reviewService.js
const mongoose = require("mongoose");
const Booking = require("../models/Booking");
const Review = require("../models/Review");
const PlatformReview = require("../models/PlatformReview");
const Expert = require("../models/Expert");
const Notification = require("../models/Notification");

/* -------------------------------------------------------------------------- */
/*                       RATE A BOOKING (EXPERT REVIEW)                      */
/* -------------------------------------------------------------------------- */
const rateBooking = async (bookingId, rating, review) => {
  if (!mongoose.Types.ObjectId.isValid(bookingId)) {
    throw Object.assign(new Error("Invalid booking ID"), { statusCode: 400 });
  }

  const parsedRating = Number(rating);
  if (isNaN(parsedRating) || parsedRating < 1 || parsedRating > 5) {
    throw Object.assign(new Error("Rating must be a number between 1 and 5"), { statusCode: 400 });
  }

  const booking = await Booking.findById(bookingId);
  if (!booking) {
    throw Object.assign(new Error("Booking not found"), { statusCode: 404 });
  }
  if (booking.status.toLowerCase() !== "completed") {
    throw Object.assign(new Error("Only completed bookings can be rated"), { statusCode: 400 });
  }
  if (booking.isRated) {
    throw Object.assign(new Error("This booking has already been rated"), { statusCode: 400 });
  }

  // Create review record
  await Review.create({
    bookingId: booking._id,
    expertId: booking.expertId,
    userId: booking.userId,
    rating: parsedRating,
    review,
  });

  // Update expert's average rating
  const expert = await Expert.findById(booking.expertId);
  if (expert) {
    expert.rating.count += 1;
    expert.rating.average =
      (expert.rating.average * (expert.rating.count - 1) + parsedRating) /
      expert.rating.count;
    await expert.save();
  }

  // Notify expert
  await Notification.create({
    expertId: booking.expertId,
    message: `🌟 You received a new ${parsedRating}-star review!`,
    type: "review",
  });

  // Mark booking as rated
  booking.isRated = true;
  await booking.save();

  return { success: true };
};

/* -------------------------------------------------------------------------- */
/*                     GET REVIEWS FOR AN EXPERT                              */
/* -------------------------------------------------------------------------- */
const getExpertReviews = async (expertId) => {
  if (!mongoose.Types.ObjectId.isValid(expertId)) {
    throw Object.assign(new Error("Invalid expert ID"), { statusCode: 400 });
  }
  return await Review.find({ expertId })
    .populate("userId", "name")
    .sort({ createdAt: -1 });
};

/* -------------------------------------------------------------------------- */
/*                    ADD PLATFORM (WEBSITE) REVIEW                          */
/* -------------------------------------------------------------------------- */
const addPlatformReview = async ({ stars, reviewText, author, userId }) => {
  return await PlatformReview.create({ stars, reviewText, author, userId });
};

/* -------------------------------------------------------------------------- */
/*                    GET ALL PLATFORM REVIEWS                                */
/* -------------------------------------------------------------------------- */
const getPlatformReviews = async () => {
  return await PlatformReview.find().sort({ createdAt: -1 });
};

/* -------------------------------------------------------------------------- */
/*                    GET PLATFORM REVIEW AVERAGE                             */
/* -------------------------------------------------------------------------- */
const getPlatformReviewAverage = async () => {
  const result = await PlatformReview.aggregate([
    {
      $group: {
        _id: null,
        avgRating: { $avg: "$stars" },
        totalReviews: { $sum: 1 },
      },
    },
  ]);
  return result[0] || { avgRating: 0, totalReviews: 0 };
};

/* -------------------------------------------------------------------------- */
/*                    DELETE PLATFORM REVIEW                                  */
/* -------------------------------------------------------------------------- */
const deletePlatformReview = async (id) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw Object.assign(new Error("Invalid review ID"), { statusCode: 400 });
  }
  const review = await PlatformReview.findByIdAndDelete(id);
  if (!review) {
    throw Object.assign(new Error("Review not found"), { statusCode: 404 });
  }
  return { message: "Review deleted" };
};

module.exports = {
  rateBooking,
  getExpertReviews,
  addPlatformReview,
  getPlatformReviews,
  getPlatformReviewAverage,
  deletePlatformReview,
};
