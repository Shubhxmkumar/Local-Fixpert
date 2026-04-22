// controllers/statsController.js
const mongoose = require("mongoose");
const Booking = require("../models/Booking");

const getExpertStats = async (req, res, next) => {
  try {
    const { expertId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(expertId)) {
      return res.status(400).json({ success: false, message: "Invalid expertId" });
    }

    const now = new Date();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 1);

    // Aggregate all status counts in one query
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

    // Count this month's completed bookings
    const thisMonthCompleted = await Booking.countDocuments({
      expertId,
      status: "completed",
      createdAt: { $gte: startOfMonth, $lt: endOfMonth },
    });

    // Build result object
    const result = {
      total: 0,
      pending: 0,
      quoted: 0,
      accepted: 0,
      confirmed: 0,
      completed: 0,
      cancelled: 0,
      thisMonth: thisMonthCompleted,
    };

    stats.forEach((item) => {
      const key = item._id?.toLowerCase();
      if (Object.prototype.hasOwnProperty.call(result, key)) {
        result[key] = item.count;
        result.total += item.count;
      }
    });

    res.json({ success: true, stats: result });
  } catch (error) {
    next(error);
  }
};

module.exports = { getExpertStats };
