// controllers/authController.js
const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

/* -------------------------------------------------------------------------- */
/*                           REGISTER USER                                    */
/* -------------------------------------------------------------------------- */
const register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const userDoc = await User.create({ name, email, password: hashedPassword });

    res.status(201).json(userDoc);
  } catch (err) {
    next(err);
  }
};

/* -------------------------------------------------------------------------- */
/*                            LOGIN USER                                      */
/* -------------------------------------------------------------------------- */
const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const valid = bcrypt.compareSync(password, user.password);
    if (!valid) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res
      .cookie("token", token, {
        httpOnly: true,
        secure: false,
        sameSite: "lax",
      })
      .json({
        success: true,
        message: "Login successful",
        user: {
          _id: user._id,
          name: user.name,
          email: user.email,
          isCustomer: user.isCustomer,
          isExpert: user.isExpert,
        },
      });
  } catch (err) {
    next(err);
  }
};

/* -------------------------------------------------------------------------- */
/*                            LOGOUT USER                                     */
/* -------------------------------------------------------------------------- */
const logout = (req, res) => {
  res.cookie("token", "").json(true);
};

/* -------------------------------------------------------------------------- */
/*                          GET PROFILE                                       */
/* -------------------------------------------------------------------------- */
const getProfile = async (req, res, next) => {
  try {
    const { token } = req.cookies;
    if (!token) {
      return res.json(null);
    }

    const userData = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(userData.id).select("name email _id");
    if (!user) {
      return res.json(null);
    }

    res.json({ name: user.name, email: user.email, _id: user._id });
  } catch (err) {
    // Invalid/expired token → return null gracefully
    res.json(null);
  }
};

module.exports = { register, login, logout, getProfile };
