// routes/statsRoutes.js
const express = require("express");
const router = express.Router();
const { getExpertStats } = require("../controllers/statsController");

// GET   /bookservice/stats/:expertId  → Expert dashboard stats
router.get("/:expertId", getExpertStats);

module.exports = router;
