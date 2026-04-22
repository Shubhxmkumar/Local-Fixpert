// routes/bookingRoutes.js
const express = require("express");
const router = express.Router();
const bookingController = require("../controllers/bookingController");
const { validateObjectId, validateBookingCreate } = require("../middlewares/validationMiddleware");

// POST   /bookservice/               → Create new booking
router.post("/", validateBookingCreate, bookingController.createBooking);

// GET    /bookservice/mybookings/:userId  → Get all bookings for a user
router.get("/mybookings/:userId", bookingController.getUserBookings);

// POST   /bookservice/rebook/:id     → Rebook an existing booking (resets payment)
router.post("/rebook/:id", validateObjectId, bookingController.rebookBooking);

// PUT    /bookservice/cancel/:id     → Cancel a booking
router.put("/cancel/:id", validateObjectId, bookingController.cancelBooking);

// PUT    /bookservice/status/:id     → Update booking status
router.put("/status/:id", validateObjectId, bookingController.updateBookingStatus);

// POST   /bookservice/quote/:id      → Expert sends a quote
router.post("/quote/:id", validateObjectId, bookingController.sendQuote);

// POST   /bookservice/accept/:id     → User accepts a quote
router.post("/accept/:id", validateObjectId, bookingController.acceptQuote);

// GET    /bookservice/expert/:expertId  → Get all bookings for an expert
router.get("/expert/:expertId", bookingController.getExpertBookings);

// GET    /bookservice/expert/active/:expertId  → Get confirmed bookings for an expert
// NOTE: this must be defined BEFORE /:id to avoid route collision
router.get("/expert/active/:expertId", bookingController.getActiveBookings);

// GET    /bookservice/:id            → Get booking by ID
router.get("/:id", validateObjectId, bookingController.getBookingById);

module.exports = router;
