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
    payment: { type: String, required: true },
    time: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Booking", bookingSchema);
