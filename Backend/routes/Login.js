const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const jwtSecret = "ggfkshfgksh"; // you can move this to .env later


axios.defaults.baseURL = "http://localhost:3000";
axios.defaults.withCredentials = true;


// ✅ LOGIN ROUTE
router.post("/", async (req, res) => {
  const { email, password } = req.body;
  try {
    // check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // verify password
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // create JWT token
    const token = jwt.sign({ id: user._id, email: user.email }, jwtSecret, {
      expiresIn: "1d",
    });

    // send token as cookie
    res.cookie("token", token, {
      httpOnly: true,
      sameSite: "lax",
    });

    res.json({
      message: "Login successful",
      user: { id: user._id, email: user.email, name: user.name },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Login failed" });
  }
});

module.exports = router;
