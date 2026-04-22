// services/bookingService.js
const mongoose = require("mongoose");
const Booking = require("../models/Booking");
const Notification = require("../models/Notification");
const Review = require("../models/Review");
const Expert = require("../models/Expert");

/* -------------------------------------------------------------------------- */
/*                            CREATE BOOKING                                  */
/* -------------------------------------------------------------------------- */
const createBooking = async (data) => {
  const { userId, expertId, expertName, serviceType, description, date, location, mobile, payment, time } = data;

  const newBooking = await Booking.create({
    userId,
    expertId,
    expertName,
    serviceType,
    description,
    date,
    location,
    mobile,
    payment,
    time,
  });

  // Notify expert of new booking
  await Notification.create({
    expertId,
    message: "📩 New service request received",
    type: "booking",
  });

  return newBooking;
};

/* -------------------------------------------------------------------------- */
/*                          GET USER BOOKINGS                                 */
/* -------------------------------------------------------------------------- */
const getUserBookings = async (userId) => {
  return await Booking.find({ userId })
    .populate("expertId", "name category mobile")
    .sort({ createdAt: -1 });
};

/* -------------------------------------------------------------------------- */
/*                          GET BOOKING BY ID                                 */
/* -------------------------------------------------------------------------- */
const getBookingById = async (id) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw Object.assign(new Error("Invalid booking ID"), { statusCode: 400 });
  }
  const booking = await Booking.findById(id).populate("expertId");
  if (!booking) {
    throw Object.assign(new Error("Booking not found"), { statusCode: 404 });
  }
  return booking;
};

/* -------------------------------------------------------------------------- */
/*                           CANCEL BOOKING                                   */
/* -------------------------------------------------------------------------- */
const cancelBooking = async (id) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw Object.assign(new Error("Invalid booking ID"), { statusCode: 400 });
  }
  const booking = await Booking.findByIdAndUpdate(id, { status: "cancelled" }, { new: true });
  if (!booking) {
    throw Object.assign(new Error("Booking not found"), { statusCode: 404 });
  }
  return booking;
};

/* -------------------------------------------------------------------------- */
/*                              REBOOK                                        */
/* ⚡ CRITICAL FIX: resets paymentStatus, paymentId, totalAmount             */
/* -------------------------------------------------------------------------- */
const rebookBooking = async (id, overrides = {}) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw Object.assign(new Error("Invalid booking ID"), { statusCode: 400 });
  }
  const oldBooking = await Booking.findById(id);
  if (!oldBooking) {
    throw Object.assign(new Error("Booking not found"), { statusCode: 404 });
  }

  const newBooking = await Booking.create({
    userId: oldBooking.userId,
    expertId: oldBooking.expertId,
    expertName: oldBooking.expertName,
    serviceType: oldBooking.serviceType,
    description: oldBooking.description,
    mobile: oldBooking.mobile,

    // Allow date/location/time override from request body
    date: overrides.date || oldBooking.date,
    location: overrides.location || oldBooking.location,
    time: overrides.time || oldBooking.time,

    // ✅ RESET BOOKING FLOW
    status: "pending",
    quoteAmount: undefined,
    quoteMessage: undefined,

    // ✅ RESET PAYMENT (Critical Fix)
    paymentStatus: "pending",
    paymentId: null,
    totalAmount: null,
    expertEarning: undefined,

    platformFee: 100,
    isRated: false,
  });

  // Notify expert of rebook
  await Notification.create({
    expertId: oldBooking.expertId,
    message: "📩 A customer has re-booked a service",
    type: "booking",
  });

  return newBooking;
};

/* -------------------------------------------------------------------------- */
/*                           UPDATE STATUS                                    */
/* -------------------------------------------------------------------------- */
const updateBookingStatus = async (id, status) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw Object.assign(new Error("Invalid booking ID"), { statusCode: 400 });
  }
  const normalizedStatus = status.toLowerCase();

  const booking = await Booking.findByIdAndUpdate(
    id,
    { status: normalizedStatus },
    { new: true }
  );
  if (!booking) {
    throw Object.assign(new Error("Booking not found"), { statusCode: 404 });
  }

  // Notify user of status change
  await Notification.create({
    userId: booking.userId,
    message: `✅ Your booking has been ${normalizedStatus}`,
    type: "status",
  });

  return booking;
};

/* -------------------------------------------------------------------------- */
/*                           SEND QUOTE                                       */
/* -------------------------------------------------------------------------- */
const sendQuote = async (id, amount, message) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw Object.assign(new Error("Invalid booking ID"), { statusCode: 400 });
  }
  if (!amount || isNaN(amount)) {
    throw Object.assign(new Error("Valid quote amount is required"), { statusCode: 400 });
  }

  const booking = await Booking.findByIdAndUpdate(
    id,
    { quoteAmount: amount, quoteMessage: message, status: "quoted" },
    { new: true }
  );
  if (!booking) {
    throw Object.assign(new Error("Booking not found"), { statusCode: 404 });
  }
  return booking;
};

/* -------------------------------------------------------------------------- */
/*                           ACCEPT QUOTE                                     */
/* -------------------------------------------------------------------------- */
const acceptQuote = async (id) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw Object.assign(new Error("Invalid booking ID"), { statusCode: 400 });
  }

  const booking = await Booking.findById(id);
  if (!booking) {
    throw Object.assign(new Error("Booking not found"), { statusCode: 404 });
  }

  const PLATFORM_FEE = 100;

  if (!booking.quoteAmount || booking.quoteAmount <= PLATFORM_FEE) {
    throw Object.assign(new Error("Quote must be greater than ₹100"), { statusCode: 400 });
  }

  booking.platformFee = PLATFORM_FEE;
  booking.totalAmount = booking.quoteAmount;
  booking.expertEarning = booking.quoteAmount - PLATFORM_FEE;
  booking.status = "accepted";

  await booking.save();
  return booking;
};

/* -------------------------------------------------------------------------- */
/*                        GET EXPERT BOOKINGS                                 */
/* -------------------------------------------------------------------------- */
const getExpertBookings = async (expertId) => {
  return await Booking.find({ expertId })
    .populate("userId", "name")
    .sort({ createdAt: -1 });
};

/* -------------------------------------------------------------------------- */
/*                      GET ACTIVE (CONFIRMED) BOOKINGS                       */
/* -------------------------------------------------------------------------- */
const getActiveBookings = async (expertId) => {
  return await Booking.find({ expertId, status: "confirmed" })
    .populate("userId", "name")
    .sort({ createdAt: -1 });
};

module.exports = {
  createBooking,
  getUserBookings,
  getBookingById,
  cancelBooking,
  rebookBooking,
  updateBookingStatus,
  sendQuote,
  acceptQuote,
  getExpertBookings,
  getActiveBookings,
};
