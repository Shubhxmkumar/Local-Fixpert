// controllers/notificationController.js
const Notification = require("../models/Notification");

/* -------------------------------------------------------------------------- */
/*                     GET NOTIFICATIONS (user OR expert)                    */
/* -------------------------------------------------------------------------- */
const getNotifications = async (req, res, next) => {
  try {
    const notifications = await Notification.find({
      $or: [{ userId: req.params.id }, { expertId: req.params.id }],
    }).sort({ createdAt: -1 });

    res.json(notifications);
  } catch (err) {
    next(err);
  }
};

/* -------------------------------------------------------------------------- */
/*                        MARK ALL AS READ                                    */
/* -------------------------------------------------------------------------- */
const markAllRead = async (req, res, next) => {
  try {
    await Notification.updateMany(
      {
        $or: [{ userId: req.params.id }, { expertId: req.params.id }],
      },
      { read: true }
    );

    res.json({ success: true });
  } catch (err) {
    next(err);
  }
};

module.exports = { getNotifications, markAllRead };
