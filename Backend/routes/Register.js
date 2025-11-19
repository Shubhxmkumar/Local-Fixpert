const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");
require("dotenv").config();

const bcryptSalt = bcrypt.genSaltSync(10);
const jwtSecret = process.env.JWT_SECRET;

router.post("/reg-insert", async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const existing = await User.findOne({ email });
    if (existing)
      return res.status(400).json({ message: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const userDoc = await User.create({
      name,
      email,
      password: hashedPassword,
    });
    res.status(201).json(userDoc);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Registration failed" });
  }
});

module.exports = router;
