// app.js
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const { notFound, errorHandler } = require("./middlewares/errorMiddleware");
const authController = require("./controllers/authController");

// ── Route Imports ─────────────────────────────────────────────────────────────
const authRegisterRoutes    = require("./routes/authRoutes");
const loginRoutes           = require("./routes/loginRoutes");
const expertRoutes          = require("./routes/expertRoutes");
const bookingRoutes         = require("./routes/bookingRoutes");
const paymentRoutes         = require("./routes/paymentRoutes");
const reviewRoutes          = require("./routes/reviewRoutes");
const statsRoutes           = require("./routes/statsRoutes");
const notificationRoutes    = require("./routes/notificationRoutes");

const app = express();

// ── Core Middleware ───────────────────────────────────────────────────────────
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: [
      "https://5173-cs-216d3b45-f3d8-4c55-a68c-03929d53b127.cs-asia-east1-duck.cloudshell.dev",
      "http://localhost:5173",
    ],
    credentials: true,
  })
);

// ── Health Check ──────────────────────────────────────────────────────────────
app.get("/", (req, res) => res.json({ message: "Local Fixpert API is running 🚀" }));

// ── Auth Routes ───────────────────────────────────────────────────────────────
app.use("/register", authRegisterRoutes);
app.use("/login", loginRoutes);
app.post("/logout", authController.logout);
app.get("/profile", authController.getProfile);

// ── Expert Routes ─────────────────────────────────────────────────────────────
app.use("/expert", expertRoutes);

// ── Booking Routes ────────────────────────────────────────────────────────────
// Payment routes are mounted under /bookservice so they share the same base URL
// as the original API (e.g. /bookservice/create-order/:id, /bookservice/verify-payment)
app.use("/bookservice", bookingRoutes);
app.use("/bookservice", paymentRoutes);

// Stats mounted under /bookservice/stats to preserve original endpoint
app.use("/bookservice/stats", statsRoutes);

// ── Review Routes ─────────────────────────────────────────────────────────────
// Expert-level booking reviews live under /bookservice (preserve original URLs)
app.use("/bookservice", reviewRoutes);

// Platform reviews live under /review
app.use("/review", reviewRoutes);

// ── Notification Routes ───────────────────────────────────────────────────────
app.use("/notifications", notificationRoutes);

// ── Error Handling (must be LAST) ─────────────────────────────────────────────
app.use(notFound);
app.use(errorHandler);

module.exports = app;
