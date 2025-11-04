const express = require("express");
const router = express.Router();
const Expert = require("../models/Expert"); // make sure Expert model exists

// GET all experts
router.get("/", async (req, res) => {
  try {
    const experts = await Expert.find();
    res.json(experts);
  } catch (err) {
    console.error("Error fetching experts:", err);
    res.status(500).json({ message: "Server error fetching experts" });
  }
});

module.exports = router;
