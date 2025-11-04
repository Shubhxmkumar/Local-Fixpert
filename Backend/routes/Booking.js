const express = require("express");
const router = express.Router();
const Booking = require("../models/Booking");
const jwt = require("jsonwebtoken");

/* -------------------------------------------------------------------------- */
/*                          🔹 Middleware: Verify Token                       */
/* -------------------------------------------------------------------------- */
const verifyToken = (req, res, next) => {
  try {
    const token = req.cookies?.token;

    if (!token) {
      return res.status(401).json({ message: "No token provided" });
    }

    // ✅ Use same secret as used during login
    jwt.verify(
      token,
      process.env.JWT_SECRET || "ggfkshfgksh",
      (err, decoded) => {
        if (err) return res.status(403).json({ message: "Invalid token" });
        req.userId = decoded.id;
        next();
      }
    );
  } catch (error) {
    console.error("❌ Token verification failed:", error.message);
    return res.status(500).json({ message: "Token verification error" });
  }
};

/* -------------------------------------------------------------------------- */
/*                         🔹 POST: Create New Booking                        */
/* -------------------------------------------------------------------------- */
router.post("/", verifyToken, async (req, res) => {
  try {
    const {
      expertId,
      expertName,
      serviceType,
      description,
      date,
      location,
      mobile,
      payment,
      time,
    } = req.body;

    if (!expertId || !date || !location) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const newBooking = await Booking.create({
      userId: req.userId, // ✅ taken from decoded JWT
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

    res.status(201).json({
      success: true,
      message: "Booking created successfully",
      booking: newBooking,
    });
  } catch (error) {
    console.error("❌ Booking creation failed:", error.message);
    res.status(500).json({ success: false, message: error.message });
  }
});

/* -------------------------------------------------------------------------- */
/*                     🔹 GET: Fetch All Bookings for a User                  */
/* -------------------------------------------------------------------------- */
router.get("/mybookings", verifyToken, async (req, res) => {
  try {
    const bookings = await Booking.find({ userId: req.userId })
      .populate("expertId", "name category")
      .sort({ date: -1 });

    res.status(200).json({ success: true, bookings });
  } catch (error) {
    console.error("❌ Failed to fetch bookings:", error.message);
    res.status(500).json({ message: "Failed to fetch bookings" });
  }
});

module.exports = router;
