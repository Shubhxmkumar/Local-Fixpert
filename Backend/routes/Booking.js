const express = require("express");
const router = express.Router();
const Booking = require("../models/Booking");

/* -------------------------------------------------------------------------- */
/*                         🔹 POST: Create New Booking                        */
/* -------------------------------------------------------------------------- */
router.post("/", async (req, res) => {
  try {
    const {
      userId, // ✅ now coming from frontend
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

    if (!userId || !expertId || !date || !location) {
      return res.status(400).json({ message: "Missing required fields" });
    }

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
router.get("/mybookings/:userId", async (req, res) => {
  try {
    const { userId } = req.params;

    const bookings = await Booking.find({ userId })
      .populate("expertId", "name category")
      .sort({ createdAt: -1 });

    res.status(200).json({ success: true, bookings });
  } catch (error) {
    console.error("❌ Failed to fetch bookings:", error.message);
    res.status(500).json({ message: "Failed to fetch bookings" });
  }
});
// cancel booking 
router.put("/cancel/:id", async (req, res) => {
  try {
    const booking = await Booking.findByIdAndUpdate(
      req.params.id,
      { status: "cancelled" },
      { new: true }
    );

    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    res.json({ success: true, booking });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
// rebook 
router.post("/rebook/:id", async (req, res) => {
  try {
    const oldBooking = await Booking.findById(req.params.id);

    if (!oldBooking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    const newBooking = await Booking.create({
      ...oldBooking.toObject(),
      _id: undefined,
      status: "pending",
      createdAt: undefined,
      updatedAt: undefined,
    });

    res.json({ success: true, booking: newBooking });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.put("/status/:id", async (req, res) => {
  try {
    const { status } = req.body;

    const booking = await Booking.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    res.json({ success: true, booking });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;