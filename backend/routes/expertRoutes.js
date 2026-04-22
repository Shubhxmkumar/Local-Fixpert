// routes/expertRoutes.js
const express = require("express");
const router = express.Router();
const expertController = require("../controllers/expertController");
const { validateObjectId, validateExpertLogin } = require("../middlewares/validationMiddleware");

// POST   /expert/regexpert         → Register a new expert
router.post("/regexpert", expertController.registerExpert);

// GET    /expert/experts           → Get all experts (with client count)
router.get("/experts", expertController.getAllExperts);

// POST   /expert/login             → Expert login
router.post("/login", validateExpertLogin, expertController.loginExpert);

// PUT    /expert/update/:id        → Update expert profile
router.put("/update/:id", validateObjectId, expertController.updateExpert);

// PATCH  /expert/:id/availability  → Toggle expert availability
router.patch("/:id/availability", validateObjectId, expertController.toggleAvailability);

module.exports = router;
