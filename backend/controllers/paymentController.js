// controllers/paymentController.js
const paymentService = require("../services/paymentService");

const createOrder = async (req, res, next) => {
  try {
    const order = await paymentService.createOrder(req.params.id);
    res.json({ order });
  } catch (err) {
    next(err);
  }
};

const verifyPayment = async (req, res, next) => {
  try {
    const { bookingId, paymentId } = req.body;
    const booking = await paymentService.verifyPayment(bookingId, paymentId);
    res.json({ success: true, booking });
  } catch (err) {
    next(err);
  }
};

module.exports = { createOrder, verifyPayment };
