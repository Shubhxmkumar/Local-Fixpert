const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const Counter = require("./Counter");

const expertSchema = new mongoose.Schema(
  {
    expertID: {
      type: String,
      unique: true,
    },

    fullName: { type: String, required: true, trim: true, minlength: 3 },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      match: [/^\S+@\S+\.\S+$/, "Invalid email"],
    },

    password: { type: String, required: true },

    mobile: {
      type: String,
      match: [/^[0-9]{10}$/, "Invalid mobile"],
    },

    profilePhoto: {
      type: String,
      default: "https://your-default-image-url.com/default.png",
    },

    category: {
      type: String,
      required: true,
      enum: [
        "Plumbing",
        "Electrician",
        "House Cleaning",
        "AC Servicing",
        "Carpenter",
        "Mover",
        "Wall Painter",
      ],
    },

    experience: { type: String },

    // ✅ FIXED (string for now to match frontend)
    serviceArea: { type: String, required: true },

    language: { type: String },

    rating: {
      average: { type: Number, default: 0 },
      count: { type: Number, default: 0 },
    },

    price: { type: Number },

    isAvailable: { type: Boolean, default: true },

    status: {
      type: String,
      enum: ["active", "inactive", "blocked"],
      default: "active",
    },

    isExpert: { type: Boolean, default: true },
    isCustomer: { type: Boolean, default: false },
  },
  { timestamps: true }
);

// 🔐 HASH PASSWORD
expertSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// 🔢 GENERATE EXPERT ID (START FROM 4571)
expertSchema.pre("save", async function (next) {
  if (this.expertID) return next();

  let counter = await Counter.findOne({ name: "expertID" });

  if (!counter) {
    counter = await Counter.create({
      name: "expertID",
      seq: 4590,
    });
  }

  counter.seq += 2;
  await counter.save();

  this.expertID = `EXP${counter.seq}`;
  next();
});

// 🔒 HIDE PASSWORD
expertSchema.methods.toJSON = function () {
  const obj = this.toObject();
  delete obj.password;
  return obj;
};

module.exports = mongoose.model("Expert", expertSchema);