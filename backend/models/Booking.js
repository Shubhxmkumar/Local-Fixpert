const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    expertId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Expert",
      required: true,
    },
    expertName: { type: String, required: true },
    serviceType: { type: String, required: true },
    description: { type: String },

    date: { type: String, required: true },
    location: { type: String, required: true },
    mobile: { type: String, required: true },
    time: { type: String },

    // ✅ STATUS FLOW
    status: {
      type: String,
      enum: ["pending", "quoted", "accepted", "completed", "cancelled"],
      default: "pending",
      lowercase: true,
    },

    // ✅ QUOTE SYSTEM
    quoteAmount: Number,
    quoteMessage: String,

    // ✅ PAYMENT SYSTEM
    paymentStatus: {
      type: String,
      default: "pending",
    },
    paymentId: String,

    // ✅ PLATFORM LOGIC
    platformFee: {
      type: Number,
      default: 100,
    },
    expertEarning: Number,
    totalAmount: Number,

    // ⭐ rating
    isRated: { type: Boolean, default: false },
  },
  { timestamps: true }
);
module.exports = mongoose.model("Booking", bookingSchema);
