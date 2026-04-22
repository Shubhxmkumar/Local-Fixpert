// routes/paymentRoutes.js
const express = require("express");
const router = express.Router();
const paymentController = require("../controllers/paymentController");
const { validateObjectId } = require("../middlewares/validationMiddleware");

// POST   /bookservice/create-order/:id   → Create Razorpay order (booking must be "accepted")
router.post("/create-order/:id", validateObjectId, paymentController.createOrder);

// POST   /bookservice/verify-payment     → Verify and confirm payment
router.post("/verify-payment", paymentController.verifyPayment);

module.exports = router;
