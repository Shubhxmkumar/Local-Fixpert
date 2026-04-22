// routes/loginRoutes.js
const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const { validateUserLogin } = require("../middlewares/validationMiddleware");

// POST   /login    → Login user
router.post("/", validateUserLogin, authController.login);

module.exports = router;
