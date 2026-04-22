// routes/authRoutes.js
const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const { validateUserRegister, validateUserLogin } = require("../middlewares/validationMiddleware");

// POST   /register    → Register new user
router.post("/", validateUserRegister, authController.register);

module.exports = router;
