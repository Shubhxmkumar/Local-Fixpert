const express = require("express");
const router = express.Router();
const Booking = require("../models/Booking");
const jwt = require("jsonwebtoken");

app.post("/bookings", async (req, res) => {
  const userData = await getUserFromReq(req);
  const { place, checkIn, checkOut, numberOfGuests, name, mobile, price } =
    req.body;

  Booking.create({
    place,
    checkIn,
    checkOut,
    numberOfGuests,
    name,
    mobile,
    price,
    user: userData.id,
  })
    .then((doc) => {
      res.json(doc);
    })
    .catch((err) => {
      throw err;
    });
});

app.get("/bookings", async (req, res) => {
  const userData = await getUserFromReq(req);
  res.json(await Booking.find({ user: userData.id }).populate("place"));
});
