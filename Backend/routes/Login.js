const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

router.post("/", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return res.status(401).json({ message: "Invalid password" });

    // ✅ Create JWT
    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET || "ggfkshfgksh",
      { expiresIn: "1d" }
    );

    // ✅ Send JWT as cookie
    res
      .cookie("token", token, {
        httpOnly: true,
        sameSite: "lax",
        secure: false, // change to true if using HTTPS
      })
      .status(200)
      .json({
        message: "Login successful",
        user: { _id: user._id, name: user.name, email: user.email },
      });
  } catch (error) {
    console.error("Login failed:", error.message);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
