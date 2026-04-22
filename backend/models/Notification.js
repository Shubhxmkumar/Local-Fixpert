// models/Notification.js
const mongoose = require("mongoose");

const notificationSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },
    expertId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Expert",
      default: null,
    },
    message: String,
    type: {
      type: String,
      enum: ["booking", "status", "review"],
      default: "booking",
    },
    read: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Notification", notificationSchema);