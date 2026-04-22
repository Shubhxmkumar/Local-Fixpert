// routes/notificationRoutes.js
const express = require("express");
const router = express.Router();
const notificationController = require("../controllers/notificationController");

// GET    /notifications/:id        → Get all notifications for user or expert
router.get("/:id", notificationController.getNotifications);

// PATCH  /notifications/read/:id   → Mark all notifications as read
router.patch("/read/:id", notificationController.markAllRead);

module.exports = router;
