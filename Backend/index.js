const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
// const User = require("./models/User");
// const Booking = require("./models/Bookings");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const multer = require("multer");
const fs = require("fs");
const path = require("path");
require("dotenv").config();

app.use(
  cors({
    origin: "http://localhost:5174",
    credentials: true,
  })
);

app.get("/", (req, res) => {
  res.send("Backend");
});

app.listen(3000, () => {
  console.log("Connected");
});
