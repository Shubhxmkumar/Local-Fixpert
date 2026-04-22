// middlewares/validationMiddleware.js
const mongoose = require("mongoose");

/**
 * Validates that req.params.id is a valid MongoDB ObjectId.
 * Returns 400 if invalid.
 */
const validateObjectId = (req, res, next) => {
  const id = req.params.id || req.params.expertId || req.params.userId;
  if (id && !mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ success: false, message: "Invalid ID format" });
  }
  next();
};

/**
 * Validates required fields for creating a booking.
 */
const validateBookingCreate = (req, res, next) => {
  const { userId, expertId, expertName, serviceType, date, location, mobile } = req.body;
  const missing = [];

  if (!userId) missing.push("userId");
  if (!expertId) missing.push("expertId");
  if (!expertName) missing.push("expertName");
  if (!serviceType) missing.push("serviceType");
  if (!date) missing.push("date");
  if (!location) missing.push("location");
  if (!mobile) missing.push("mobile");

  if (missing.length > 0) {
    return res.status(400).json({
      success: false,
      message: `Missing required fields: ${missing.join(", ")}`,
    });
  }
  next();
};

/**
 * Validates required fields for user registration.
 */
const validateUserRegister = (req, res, next) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res.status(400).json({ success: false, message: "name, email and password are required" });
  }
  next();
};

/**
 * Validates required fields for user login.
 */
const validateUserLogin = (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ success: false, message: "email and password are required" });
  }
  next();
};

/**
 * Validates required fields for platform review.
 */
const validatePlatformReview = (req, res, next) => {
  const { stars, author, userId } = req.body;
  if (!stars || !author || !userId) {
    return res.status(400).json({ success: false, message: "stars, author and userId are required" });
  }
  next();
};

/**
 * Validates required fields for expert login.
 */
const validateExpertLogin = (req, res, next) => {
  const { identifier, password } = req.body;
  if (!identifier || !password) {
    return res.status(400).json({ success: false, message: "identifier and password are required" });
  }
  next();
};

module.exports = {
  validateObjectId,
  validateBookingCreate,
  validateUserRegister,
  validateUserLogin,
  validatePlatformReview,
  validateExpertLogin,
};
