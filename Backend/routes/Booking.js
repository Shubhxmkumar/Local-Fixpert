const express = require("express");
const router = express.Router();
const Booking = require("../models/Booking");
const mongoose = require("mongoose");
const Razorpay = require("razorpay");

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

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

/*                     🔹 GET: Fetch All Bookings for a User                  */

router.get("/mybookings/:userId", async (req, res) => {
  try {
    const { userId } = req.params;

    const bookings = await Booking.find({ userId })
      .populate("expertId", "name category mobile")
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
      { new: true },
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

    const newBooking = new Booking({
      userId: oldBooking.userId,
      expertId: oldBooking.expertId,
      expertName: oldBooking.expertName,
      serviceType: oldBooking.serviceType,
      description: oldBooking.description,
      mobile: oldBooking.mobile,

      // 🔄 allow override
      date: req.body.date || oldBooking.date,
      location: req.body.location || oldBooking.location,
      time: req.body.time || oldBooking.time,

      // ✅ RESET FLOW
      status: "pending",
      quoteAmount: undefined,
      quoteMessage: undefined,

      // ❌ RESET PAYMENT
      paymentStatus: "pending",
      paymentId: undefined,
      totalAmount: undefined,
      expertEarning: undefined,

      platformFee: 100,
    });

    await newBooking.save();

    res.json({ success: true, booking: newBooking });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Rebook failed" });
  }
});
router.get("/:id", async (req, res) => {
  const booking = await Booking.findById(req.params.id).populate("expertId");
  res.json({ booking });
});


router.post("/accept/:id", async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    const PLATFORM_FEE = 100;

    if (!booking.quoteAmount || booking.quoteAmount <= PLATFORM_FEE) {
      return res.status(400).json({
        message: "Quote must be greater than ₹100",
      });
    }

    booking.platformFee = PLATFORM_FEE;
    booking.totalAmount = booking.quoteAmount;
    booking.expertEarning = booking.quoteAmount - PLATFORM_FEE;

    booking.status = "accepted";

    await booking.save();

    res.json({ booking });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});
router.post("/verify-payment", async (req, res) => {
  try {
    const { bookingId, paymentId } = req.body;

    const booking = await Booking.findById(bookingId);

    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    booking.paymentStatus = "paid";
    booking.paymentId = paymentId;

    await booking.save();

    res.json({ success: true });
  } catch (err) {
    console.error("❌ Fake payment error:", err);
    res.status(500).json({ message: "Payment failed" });
  }
});


router.post("/create-order/:id", async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);
console.log("BOOKING:", booking);
console.log("TOTAL:", booking.totalAmount);
console.log("QUOTE:", booking.quoteAmount);
    const options = {
      amount: booking.totalAmount * 100, // paise
      currency: "INR",
      receipt: "order_" + booking._id,
    };

    const order = await razorpay.orders.create(options);

    res.json({ order });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
router.post("/quote/:id", async (req, res) => {
  try {
    const { amount, message } = req.body;

    const booking = await Booking.findByIdAndUpdate(
      req.params.id,
      {
        quoteAmount: amount,
        quoteMessage: message,
        status: "quoted",
      },
      { new: true }
    );

    res.json({ booking });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error sending quote" });
  }
});

router.put("/status/:id", async (req, res) => {
  let { status } = req.body;

  try {
    status = status.toLowerCase(); // 🔥 normalize

    const booking = await Booking.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true },
    );

    res.json(booking);
  } catch (err) {
    res.status(500).json({ message: "Error updating status" });
  }
});

router.get("/expert/:expertId", async (req, res) => {
  try {
    const bookings = await Booking.find({
      expertId: req.params.expertId,
    })
      .populate("userId", "name")
      .sort({ createdAt: -1 });

    res.json(bookings);
  } catch (err) {
    res.status(500).json({ message: "Error fetching bookings" });
  }
});

/*        🔹 GET: Count bookings by status (for expert dashboard)             */

router.get("/stats/:expertId", async (req, res) => {
  try {
    const { expertId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(expertId)) {
      return res.status(400).json({ message: "Invalid expertId" });
    }

    const now = new Date();

    // 🗓️ Start of month
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

    // 🗓️ End of month
    const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 1);

    // 🔹 ALL STATUS COUNTS
    const stats = await Booking.aggregate([
      {
        $match: {
          expertId: new mongoose.Types.ObjectId(expertId),
        },
      },
      {
        $group: {
          _id: "$status",
          count: { $sum: 1 },
        },
      },
    ]);

    // 🔹 THIS MONTH COMPLETED
    const thisMonthCompleted = await Booking.countDocuments({
      expertId,
      status: "completed",
      createdAt: {
        $gte: startOfMonth,
        $lt: endOfMonth,
      },
    });

    // 🔹 FORMAT RESPONSE
    const result = {
      total: 0,
      pending: 0,
      confirmed: 0,
      completed: 0,
      cancelled: 0,
      thisMonth: thisMonthCompleted, // ✅ REAL VALUE
    };

    stats.forEach((item) => {
      const key = item._id?.toLowerCase();
      if (result.hasOwnProperty(key)) {
        result[key] = item.count;
        result.total += item.count;
      }
    });

    res.json({ success: true, stats: result });
  } catch (error) {
    console.error("❌ Stats error:", error);
    res.status(500).json({ message: "Failed to fetch stats" });
  }
});

router.get("/expert/active/:expertId", async (req, res) => {
  try {
    const { expertId } = req.params;

    const bookings = await Booking.find({
      expertId,
      status: "confirmed",
      // status: { $in: ["pending", "confirmed"] }, // ✅ filter here
    })
      .populate("userId", "name")
      .sort({ createdAt: -1 });

    res.json({ success: true, bookings });
  } catch (err) {
    console.error("❌ Error fetching active bookings:", err);
    res.status(500).json({ message: "Error fetching bookings" });
  }
});

// POST /bookservice/rate/:id
const Review = require("../models/Review");
const Expert = require("../models/Expert");

router.post("/rate/:id", async (req, res) => {
  try {
    let { rating, review } = req.body;
    rating = Number(rating);

    const booking = await Booking.findById(req.params.id);

    if (!booking) return res.status(404).json({ msg: "Booking not found" });

    if (booking.status.toLowerCase() !== "completed") {
      return res.status(400).json({ msg: "Only completed bookings" });
    }

    if (booking.isRated) {
      return res.status(400).json({ msg: "Already rated" });
    }

    // ✅ create review
    await Review.create({
      bookingId: booking._id,
      expertId: booking.expertId,
      userId: booking.userId,
      rating,
      review,
    });

    // ⭐ UPDATE EXPERT FIRST
    const expert = await Expert.findById(booking.expertId);

    if (expert) {
      expert.rating.count += 1;

      expert.rating.average =
        (expert.rating.average * (expert.rating.count - 1) + rating) /
        expert.rating.count;

      await expert.save();

      console.log("✅ Expert updated:", expert.rating);
    } else {
      console.log("❌ Expert NOT FOUND");
    }

    // ✅ THEN mark booking
    booking.isRated = true;
    await booking.save();

    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ err: err.message });
  }
});

// get reviews
router.get("/reviews/:expertId", async (req, res) => {
  try {
    const reviews = await Review.find({
      expertId: req.params.expertId,
    })
      .populate("userId", "name")
      .sort({ createdAt: -1 });

    res.json({ success: true, reviews });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

module.exports = router;
