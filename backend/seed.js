/**
 * Local Fixpert — MongoDB Seed Script
 * ------------------------------------
 * Password for ALL profiles (users & experts): 12345
 *
 * Usage:
 *   node seed.js
 *
 * Make sure your .env has MONGO_URL set, or update the URI below.
 * Run from the backend/ folder so dotenv picks up your .env:
 *   cd backend && node ../seed.js
 */

require("dotenv").config();
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

/* ─── DB ──────────────────────────────────────────────────────────────── */
const MONGO_URL =
  process.env.MONGO_URL || "mongodb://127.0.0.1:27017/localfixpert";

/* ─── Inline schemas (mirrors your models exactly) ───────────────────── */

const counterSchema = new mongoose.Schema({
  name: { type: String, required: true },
  seq:  { type: Number, default: 4570 },
});
const Counter = mongoose.model("Counter", counterSchema);

const userSchema = new mongoose.Schema({
  name:       String,
  email:      { type: String, unique: true },
  password:   String,
  isCutomer:  { type: Boolean, default: true },
  isExpert:   { type: Boolean, default: false },
});
const User = mongoose.model("User", userSchema);

const expertSchema = new mongoose.Schema(
  {
    expertID:     { type: String, unique: true },
    fullName:     { type: String, required: true },
    email:        { type: String, required: true, unique: true, lowercase: true },
    password:     { type: String, required: true },
    mobile:       String,
    profilePhoto: { type: String, default: "https://your-default-image-url.com/default.png" },
    category: {
      type: String,
      enum: ["Plumbing","Electrician","House Cleaning","AC Servicing","Carpenter","Mover","Wall Painter"],
    },
    experience:  String,
    serviceArea: { type: String, required: true },
    language:    String,
    rating: {
      average: { type: Number, default: 0 },
      count:   { type: Number, default: 0 },
    },
    price:       Number,
    isAvailable: { type: Boolean, default: true },
    status:      { type: String, enum: ["active","inactive","blocked"], default: "active" },
    isExpert:    { type: Boolean, default: true },
    isCustomer:  { type: Boolean, default: false },
  },
  { timestamps: true }
);
const Expert = mongoose.model("Expert", expertSchema);

const bookingSchema = new mongoose.Schema(
  {
    userId:       { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    expertId:     { type: mongoose.Schema.Types.ObjectId, ref: "Expert", required: true },
    expertName:   { type: String, required: true },
    serviceType:  { type: String, required: true },
    description:  String,
    date:         { type: String, required: true },
    location:     { type: String, required: true },
    mobile:       { type: String, required: true },
    time:         String,
    status:       { type: String, enum: ["pending","quoted","accepted","completed","cancelled"], default: "pending" },
    quoteAmount:  Number,
    quoteMessage: String,
    paymentStatus:{ type: String, default: "pending" },
    paymentId:    String,
    platformFee:  { type: Number, default: 100 },
    expertEarning:Number,
    totalAmount:  Number,
    isRated:      { type: Boolean, default: false },
  },
  { timestamps: true }
);
const Booking = mongoose.model("Booking", bookingSchema);

const reviewSchema = new mongoose.Schema(
  {
    bookingId: { type: mongoose.Schema.Types.ObjectId, ref: "Booking", required: true, unique: true },
    expertId:  { type: mongoose.Schema.Types.ObjectId, ref: "Expert",  required: true },
    userId:    { type: mongoose.Schema.Types.ObjectId, ref: "User",    required: true },
    rating:    { type: Number, required: true, min: 1, max: 5 },
    review:    { type: String, trim: true },
  },
  { timestamps: true }
);
const Review = mongoose.model("Review", reviewSchema);

const platformReviewSchema = new mongoose.Schema(
  {
    stars:      { type: Number, required: true, min: 1, max: 5 },
    reviewText: { type: String, trim: true, maxlength: 500 },
    author:     { type: String, required: true },
    userId:     { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true }
);
const PlatformReview = mongoose.model("PlatformReview", platformReviewSchema);

const notificationSchema = new mongoose.Schema(
  {
    userId:   { type: mongoose.Schema.Types.ObjectId, ref: "User",   default: null },
    expertId: { type: mongoose.Schema.Types.ObjectId, ref: "Expert", default: null },
    message:  String,
    type:     { type: String, enum: ["booking","status","review"], default: "booking" },
    read:     { type: Boolean, default: false },
  },
  { timestamps: true }
);
const Notification = mongoose.model("Notification", notificationSchema);

/* ─── Helpers ─────────────────────────────────────────────────────────── */
const hash = (pwd) => bcrypt.hashSync(pwd, 10);
const PWD   = "12345"; // ← universal password

/* ─── Seed ────────────────────────────────────────────────────────────── */
async function seed() {
  await mongoose.connect(MONGO_URL);
  console.log("✅ Connected to MongoDB:", MONGO_URL);

  // Wipe existing data (safe for dev)
  await Promise.all([
    User.deleteMany({}),
    Expert.deleteMany({}),
    Booking.deleteMany({}),
    Review.deleteMany({}),
    PlatformReview.deleteMany({}),
    Notification.deleteMany({}),
    Counter.deleteMany({}),
  ]);
  console.log("🗑  Cleared existing collections");

  /* ── Counter ── */
  await Counter.create({ name: "expertID", seq: 4590 });

  /* ── Users ─────────────────────────────────────────────────────────── */
  const usersRaw = [
    { name: "Aarav Sharma",   email: "aarav.sharma@gmail.com"   },
    { name: "Priya Mehta",    email: "priya.mehta@gmail.com"    },
    { name: "Rohit Verma",    email: "rohit.verma@gmail.com"    },
    { name: "Sneha Kapoor",   email: "sneha.kapoor@gmail.com"   },
    { name: "Karan Patel",    email: "karan.patel@gmail.com"    },
    { name: "Anjali Singh",   email: "anjali.singh@gmail.com"   },
    { name: "Vikram Joshi",   email: "vikram.joshi@gmail.com"   },
    { name: "Meera Rao",      email: "meera.rao@gmail.com"      },
    { name: "Aditya Kumar",   email: "aditya.kumar@gmail.com"   },
    { name: "Pooja Nair",     email: "pooja.nair@gmail.com"     },
  ];

  const users = await User.insertMany(
    usersRaw.map((u) => ({ ...u, password: hash(PWD), isCutomer: true, isExpert: false }))
  );
  console.log(`👤 Inserted ${users.length} users  (password: ${PWD})`);

  /* ── Experts ────────────────────────────────────────────────────────── */
  // expertID is normally auto-generated; we assign manually for seeding
  const expertsRaw = [
    {
      expertID: "EXP4592", fullName: "Ramesh Plumber",     email: "ramesh.plumber@fixpert.com",
      mobile: "9876543210", category: "Plumbing",          experience: "8 years",
      serviceArea: "Amritsar", language: "Hindi, Punjabi",  price: 350,
      rating: { average: 4.6, count: 34 },
    },
    {
      expertID: "EXP4594", fullName: "Suresh Electric",    email: "suresh.electric@fixpert.com",
      mobile: "9876543211", category: "Electrician",       experience: "5 years",
      serviceArea: "Ludhiana", language: "Hindi, Punjabi",  price: 400,
      rating: { average: 4.3, count: 21 },
    },
    {
      expertID: "EXP4596", fullName: "Gurpreet Cleaner",   email: "gurpreet.cleaner@fixpert.com",
      mobile: "9876543212", category: "House Cleaning",    experience: "3 years",
      serviceArea: "Chandigarh", language: "Punjabi",       price: 500,
      rating: { average: 4.8, count: 57 },
    },
    {
      expertID: "EXP4598", fullName: "Manpreet AC",        email: "manpreet.ac@fixpert.com",
      mobile: "9876543213", category: "AC Servicing",      experience: "6 years",
      serviceArea: "Jalandhar", language: "Hindi, Punjabi", price: 600,
      rating: { average: 4.5, count: 18 },
    },
    {
      expertID: "EXP4600", fullName: "Harpal Carpenter",   email: "harpal.carpenter@fixpert.com",
      mobile: "9876543214", category: "Carpenter",         experience: "10 years",
      serviceArea: "Amritsar", language: "Punjabi",         price: 450,
      rating: { average: 4.7, count: 42 },
    },
    {
      expertID: "EXP4602", fullName: "Diljit Mover",       email: "diljit.mover@fixpert.com",
      mobile: "9876543215", category: "Mover",             experience: "4 years",
      serviceArea: "Ludhiana", language: "Hindi, Punjabi",  price: 1200,
      rating: { average: 4.2, count: 13 },
    },
    {
      expertID: "EXP4604", fullName: "Balveer Painter",    email: "balveer.painter@fixpert.com",
      mobile: "9876543216", category: "Wall Painter",      experience: "7 years",
      serviceArea: "Patiala", language: "Punjabi",          price: 800,
      rating: { average: 4.4, count: 29 },
    },
    {
      expertID: "EXP4606", fullName: "Navdeep Electrician",email: "navdeep.elec@fixpert.com",
      mobile: "9876543217", category: "Electrician",       experience: "9 years",
      serviceArea: "Amritsar", language: "Hindi, Punjabi",  price: 420,
      rating: { average: 4.9, count: 61 }, isAvailable: true,
    },
    {
      expertID: "EXP4608", fullName: "Satpal Plumber",     email: "satpal.plumber@fixpert.com",
      mobile: "9876543218", category: "Plumbing",          experience: "2 years",
      serviceArea: "Bathinda", language: "Punjabi",         price: 300,
      rating: { average: 3.9, count: 8 }, isAvailable: false, status: "inactive",
    },
    {
      expertID: "EXP4610", fullName: "Kulwant AC Pro",     email: "kulwant.ac@fixpert.com",
      mobile: "9876543219", category: "AC Servicing",      experience: "11 years",
      serviceArea: "Chandigarh", language: "Hindi, Punjabi",price: 700,
      rating: { average: 4.6, count: 38 },
    },
  ];

  const experts = await Expert.insertMany(
    expertsRaw.map((e) => ({ ...e, password: hash(PWD) }))
  );
  console.log(`🔧 Inserted ${experts.length} experts  (password: ${PWD})`);

  /* ── Bookings ───────────────────────────────────────────────────────── */
  const bookingsRaw = [
    {
      userId: users[0]._id, expertId: experts[0]._id, expertName: experts[0].fullName,
      serviceType: "Plumbing", description: "Kitchen tap is leaking badly",
      date: "2025-04-10", location: "12 Lawrence Road, Amritsar", mobile: "9800000001",
      time: "10:00 AM", status: "completed",
      quoteAmount: 450, quoteMessage: "Replacement of washer + labour",
      paymentStatus: "paid", platformFee: 100, expertEarning: 350, totalAmount: 450,
      isRated: true,
    },
    {
      userId: users[1]._id, expertId: experts[1]._id, expertName: experts[1].fullName,
      serviceType: "Electrician", description: "MCB keeps tripping in the main panel",
      date: "2025-04-12", location: "45 Model Town, Ludhiana", mobile: "9800000002",
      time: "2:00 PM", status: "completed",
      quoteAmount: 600, quoteMessage: "Replace MCB + check wiring",
      paymentStatus: "paid", platformFee: 100, expertEarning: 500, totalAmount: 600,
      isRated: true,
    },
    {
      userId: users[2]._id, expertId: experts[2]._id, expertName: experts[2].fullName,
      serviceType: "House Cleaning", description: "Full 3BHK deep cleaning required",
      date: "2025-04-15", location: "Sector 22, Chandigarh", mobile: "9800000003",
      time: "9:00 AM", status: "accepted",
      quoteAmount: 1200, quoteMessage: "Deep clean incl. kitchen & bathrooms",
      paymentStatus: "pending", platformFee: 100, expertEarning: 1100, totalAmount: 1200,
      isRated: false,
    },
    {
      userId: users[3]._id, expertId: experts[3]._id, expertName: experts[3].fullName,
      serviceType: "AC Servicing", description: "AC cooling is very poor, needs gas check",
      date: "2025-04-18", location: "Model Town, Jalandhar", mobile: "9800000004",
      time: "11:00 AM", status: "quoted",
      quoteAmount: 900, quoteMessage: "Gas refill + filter cleaning",
      paymentStatus: "pending", platformFee: 100, expertEarning: 800, totalAmount: 900,
      isRated: false,
    },
    {
      userId: users[4]._id, expertId: experts[4]._id, expertName: experts[4].fullName,
      serviceType: "Carpenter", description: "Wardrobe hinges broken, need fixing",
      date: "2025-04-20", location: "Ranjit Avenue, Amritsar", mobile: "9800000005",
      time: "3:00 PM", status: "pending",
      paymentStatus: "pending", platformFee: 100, isRated: false,
    },
    {
      userId: users[5]._id, expertId: experts[5]._id, expertName: experts[5].fullName,
      serviceType: "Mover", description: "Shifting 2BHK furniture from Ludhiana to Amritsar",
      date: "2025-04-22", location: "BRS Nagar, Ludhiana", mobile: "9800000006",
      time: "7:00 AM", status: "accepted",
      quoteAmount: 5000, quoteMessage: "Full truck + 3 helpers + packing",
      paymentStatus: "pending", platformFee: 100, expertEarning: 4900, totalAmount: 5000,
      isRated: false,
    },
    {
      userId: users[6]._id, expertId: experts[6]._id, expertName: experts[6].fullName,
      serviceType: "Wall Painter", description: "Paint living room (600 sq ft)",
      date: "2025-04-25", location: "Rajpura, Patiala", mobile: "9800000007",
      time: "8:00 AM", status: "completed",
      quoteAmount: 4800, quoteMessage: "2 coats premium emulsion",
      paymentStatus: "paid", platformFee: 100, expertEarning: 4700, totalAmount: 4800,
      isRated: true,
    },
    {
      userId: users[7]._id, expertId: experts[7]._id, expertName: experts[7].fullName,
      serviceType: "Electrician", description: "Install 6 ceiling fans + wiring",
      date: "2025-04-27", location: "Majitha Road, Amritsar", mobile: "9800000008",
      time: "10:30 AM", status: "completed",
      quoteAmount: 1800, quoteMessage: "Fan installation + concealed wiring",
      paymentStatus: "paid", platformFee: 100, expertEarning: 1700, totalAmount: 1800,
      isRated: true,
    },
    {
      userId: users[8]._id, expertId: experts[0]._id, expertName: experts[0].fullName,
      serviceType: "Plumbing", description: "Bathroom flush tank not filling",
      date: "2025-04-28", location: "Green Avenue, Amritsar", mobile: "9800000009",
      time: "1:00 PM", status: "pending",
      paymentStatus: "pending", platformFee: 100, isRated: false,
    },
    {
      userId: users[9]._id, expertId: experts[9]._id, expertName: experts[9].fullName,
      serviceType: "AC Servicing", description: "Annual service for 2 split ACs",
      date: "2025-04-30", location: "Sector 8, Chandigarh", mobile: "9800000010",
      time: "4:00 PM", status: "quoted",
      quoteAmount: 1400, quoteMessage: "Service + filter clean for 2 units",
      paymentStatus: "pending", platformFee: 100, expertEarning: 1300, totalAmount: 1400,
      isRated: false,
    },
    // Extra cancelled booking
    {
      userId: users[0]._id, expertId: experts[6]._id, expertName: experts[6].fullName,
      serviceType: "Wall Painter", description: "Paint bedroom ceiling",
      date: "2025-04-05", location: "Lawrence Road, Amritsar", mobile: "9800000001",
      time: "9:00 AM", status: "cancelled",
      paymentStatus: "pending", platformFee: 100, isRated: false,
    },
  ];

  const bookings = await Booking.insertMany(bookingsRaw);
  console.log(`📅 Inserted ${bookings.length} bookings`);

  /* ── Reviews ────────────────────────────────────────────────────────── */
  // Only for completed + isRated bookings
  const ratedBookings = bookings.filter((b) => b.isRated);
  const reviewsRaw = [
    {
      bookingId: ratedBookings[0]._id, expertId: ratedBookings[0].expertId,
      userId: ratedBookings[0].userId, rating: 5,
      review: "Ramesh fixed the leak perfectly. Very professional and on time!",
    },
    {
      bookingId: ratedBookings[1]._id, expertId: ratedBookings[1].expertId,
      userId: ratedBookings[1].userId, rating: 4,
      review: "Suresh solved the MCB issue quickly. Knew his stuff.",
    },
    {
      bookingId: ratedBookings[2]._id, expertId: ratedBookings[2].expertId,
      userId: ratedBookings[2].userId, rating: 5,
      review: "Balveer did an amazing job on the living room walls. Very neat finish.",
    },
    {
      bookingId: ratedBookings[3]._id, expertId: ratedBookings[3].expertId,
      userId: ratedBookings[3].userId, rating: 4,
      review: "Navdeep installed all fans without a single issue. Highly recommended!",
    },
  ];

  const reviews = await Review.insertMany(reviewsRaw);
  console.log(`⭐ Inserted ${reviews.length} expert reviews`);

  /* ── Platform Reviews ───────────────────────────────────────────────── */
  const platformReviewsRaw = [
    { stars: 5, reviewText: "Local Fixpert is a life-saver! Got a plumber within 2 hours.", author: users[0].name, userId: users[0]._id },
    { stars: 4, reviewText: "Great service and transparent pricing. Will use again.", author: users[1].name, userId: users[1]._id },
    { stars: 5, reviewText: "The experts are verified and very professional. Loved the experience!", author: users[2].name, userId: users[2]._id },
    { stars: 3, reviewText: "Good app but took some time to get a quote. Otherwise fine.", author: users[3].name, userId: users[3]._id },
    { stars: 5, reviewText: "Best home services platform in Punjab. Highly recommended!", author: users[4].name, userId: users[4]._id },
    { stars: 4, reviewText: "Reliable experts and easy booking. Customer support is also responsive.", author: users[5].name, userId: users[5]._id },
  ];

  const platformReviews = await PlatformReview.insertMany(platformReviewsRaw);
  console.log(`🏆 Inserted ${platformReviews.length} platform reviews`);

  /* ── Notifications ──────────────────────────────────────────────────── */
  const notificationsRaw = [
    // Booking notifications for users
    { userId: users[0]._id, message: "Your booking for Plumbing has been confirmed.", type: "booking", read: true },
    { userId: users[1]._id, message: "Your Electrician booking is now completed.", type: "status", read: true },
    { userId: users[2]._id, message: "Quote received for House Cleaning — ₹1200. Please accept or decline.", type: "booking", read: false },
    { userId: users[3]._id, message: "Your AC Servicing booking has a new quote. Check it out!", type: "booking", read: false },
    { userId: users[5]._id, message: "Your Mover booking has been accepted by Diljit Mover.", type: "status", read: false },
    { userId: users[6]._id, message: "Wall painting job completed! Please leave a review.", type: "review", read: false },
    { userId: users[9]._id, message: "New quote received for AC Servicing — ₹1400.", type: "booking", read: false },
    // Notifications for experts
    { expertId: experts[0]._id, message: "New booking request for Plumbing from Aditya Kumar.", type: "booking", read: false },
    { expertId: experts[2]._id, message: "Customer Rohit Verma accepted your quote of ₹1200.", type: "status", read: true },
    { expertId: experts[4]._id, message: "New booking request for Carpenter from Karan Patel.", type: "booking", read: false },
    { expertId: experts[7]._id, message: "Meera Rao left you a 4-star review. Check it out!", type: "review", read: false },
    { expertId: experts[9]._id, message: "New booking request for AC Servicing from Pooja Nair.", type: "booking", read: false },
  ];

  await Notification.insertMany(notificationsRaw);
  console.log(`🔔 Inserted ${notificationsRaw.length} notifications`);

  /* ── Summary ─────────────────────────────────────────────────────────── */
  console.log("\n✅ Seed complete! Login credentials:");
  console.log("┌─────────────────────────────────────────────────┬──────────┐");
  console.log("│ Email                                           │ Password │");
  console.log("├─────────────────────────────────────────────────┼──────────┤");
  [...usersRaw, ...expertsRaw.map((e) => ({ email: e.email }))].forEach((u) =>
    console.log(`│ ${u.email.padEnd(47)} │ ${PWD.padEnd(8)} │`)
  );
  console.log("└─────────────────────────────────────────────────┴──────────┘");

  await mongoose.disconnect();
  console.log("\n🔌 Disconnected. Database is ready to use.");
}

seed().catch((err) => {
  console.error("❌ Seed failed:", err);
  process.exit(1);
});
