// controllers/bookingController.js
const bookingService = require("../services/bookingService");

const createBooking = async (req, res, next) => {
  try {
    const booking = await bookingService.createBooking(req.body);
    res.status(201).json({ success: true, message: "Booking created successfully", booking });
  } catch (err) {
    next(err);
  }
};

const getUserBookings = async (req, res, next) => {
  try {
    const bookings = await bookingService.getUserBookings(req.params.userId);
    res.status(200).json({ success: true, bookings });
  } catch (err) {
    next(err);
  }
};

const getBookingById = async (req, res, next) => {
  try {
    const booking = await bookingService.getBookingById(req.params.id);
    res.json({ booking });
  } catch (err) {
    next(err);
  }
};

const cancelBooking = async (req, res, next) => {
  try {
    const booking = await bookingService.cancelBooking(req.params.id);
    res.json({ success: true, booking });
  } catch (err) {
    next(err);
  }
};

const rebookBooking = async (req, res, next) => {
  try {
    const booking = await bookingService.rebookBooking(req.params.id, req.body);
    res.json({ success: true, booking });
  } catch (err) {
    next(err);
  }
};

const updateBookingStatus = async (req, res, next) => {
  try {
    const booking = await bookingService.updateBookingStatus(req.params.id, req.body.status);
    res.json(booking);
  } catch (err) {
    next(err);
  }
};

const sendQuote = async (req, res, next) => {
  try {
    const { amount, message } = req.body;
    const booking = await bookingService.sendQuote(req.params.id, amount, message);
    res.json({ booking });
  } catch (err) {
    next(err);
  }
};

const acceptQuote = async (req, res, next) => {
  try {
    const booking = await bookingService.acceptQuote(req.params.id);
    res.json({ booking });
  } catch (err) {
    next(err);
  }
};

const getExpertBookings = async (req, res, next) => {
  try {
    const bookings = await bookingService.getExpertBookings(req.params.expertId);
    res.json(bookings);
  } catch (err) {
    next(err);
  }
};

const getActiveBookings = async (req, res, next) => {
  try {
    const bookings = await bookingService.getActiveBookings(req.params.expertId);
    res.json({ success: true, bookings });
  } catch (err) {
    next(err);
  }
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
