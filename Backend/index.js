const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const User = require("./models/User");
const bcrypt = require("bcrypt");
const app = express();
require("dotenv").config();

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

const bcryptSalt = bcrypt.genSaltSync(10);
const jwtSecret = "ggfkshfgksh";

app.get("/", (req, res) => {
  res.json("HI");
});

const authRegisterRoutes = require("./routes/Register");
app.use("/register", authRegisterRoutes);

const authLoginRoutes = require("./routes/Login");
app.use("/login", authLoginRoutes);

app.post("/logout", (req, res) => {
  res.cookie("token", "").json(true);
});

const servicesRoute = require("./routes/Services");
app.use("/api/services", servicesRoute);

const bookingRoutes = require("./routes/Booking");
app.use("/bookings", bookingRoutes);

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
