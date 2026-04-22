// services/paymentService.js
const mongoose = require("mongoose");
const Booking = require("../models/Booking");
const razorpay = require("../config/razorpay");

/* -------------------------------------------------------------------------- */
/*                     CREATE RAZORPAY ORDER                                  */
/* ⚡ CRITICAL FIX: only allowed if booking.status === "accepted"            */
/* -------------------------------------------------------------------------- */
const createOrder = async (bookingId) => {
  if (!mongoose.Types.ObjectId.isValid(bookingId)) {
    throw Object.assign(new Error("Invalid booking ID"), { statusCode: 400 });
  }

  const booking = await Booking.findById(bookingId);
  if (!booking) {
    throw Object.assign(new Error("Booking not found"), { statusCode: 404 });
  }

  // ✅ Only allow payment if booking is accepted
  if (booking.status !== "accepted") {
    throw Object.assign(
      new Error(`Payment is only allowed for accepted bookings. Current status: "${booking.status}"`),
      { statusCode: 400 }
    );
  }

  if (!booking.totalAmount || booking.totalAmount <= 0) {
    throw Object.assign(new Error("Booking has no valid total amount"), { statusCode: 400 });
  }

  const options = {
    amount: booking.totalAmount * 100, // convert to paise
    currency: "INR",
    receipt: `order_${booking._id}`,
  };

  const order = await razorpay.orders.create(options);
  return order;
};

/* -------------------------------------------------------------------------- */
/*                        VERIFY / CONFIRM PAYMENT                            */
/* -------------------------------------------------------------------------- */
const verifyPayment = async (bookingId, paymentId) => {
  if (!mongoose.Types.ObjectId.isValid(bookingId)) {
    throw Object.assign(new Error("Invalid booking ID"), { statusCode: 400 });
  }
  if (!paymentId) {
    throw Object.assign(new Error("paymentId is required"), { statusCode: 400 });
  }

  const booking = await Booking.findById(bookingId);
  if (!booking) {
    throw Object.assign(new Error("Booking not found"), { statusCode: 404 });
  }

  // ✅ Only allow verification if booking is accepted
  if (booking.status !== "accepted") {
    throw Object.assign(
      new Error(`Payment verification is only allowed for accepted bookings. Current status: "${booking.status}"`),
      { statusCode: 400 }
    );
  }

  booking.paymentStatus = "paid";
  booking.paymentId = paymentId;
  await booking.save();

  return booking;
};

module.exports = { createOrder, verifyPayment };
