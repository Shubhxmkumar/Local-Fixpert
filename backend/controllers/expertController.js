// controllers/expertController.js
const Expert = require("../models/Expert");
const Booking = require("../models/Booking");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

/* -------------------------------------------------------------------------- */
/*                        REGISTER EXPERT                                     */
/* -------------------------------------------------------------------------- */
const registerExpert = async (req, res, next) => {
  try {
    const newExpert = new Expert(req.body);
    await newExpert.save();
    res.status(201).json({ message: "Expert registered successfully", expert: newExpert });
  } catch (error) {
    next(error);
  }
};

/* -------------------------------------------------------------------------- */
/*                     GET ALL EXPERTS (with client count)                   */
/* -------------------------------------------------------------------------- */
const getAllExperts = async (req, res, next) => {
  try {
    const experts = await Expert.aggregate([
      {
        $lookup: {
          from: "bookings",
          localField: "_id",
          foreignField: "expertId",
          as: "bookings",
        },
      },
      {
        $addFields: {
          clients: {
            $size: {
              $filter: {
                input: "$bookings",
                as: "b",
                cond: { $eq: [{ $toLower: "$$b.status" }, "completed"] },
              },
            },
          },
        },
      },
      {
        $project: { bookings: 0 },
      },
    ]);

    res.json(experts);
  } catch (error) {
    next(error);
  }
};

/* -------------------------------------------------------------------------- */
/*                         EXPERT LOGIN                                       */
/* -------------------------------------------------------------------------- */
const loginExpert = async (req, res, next) => {
  try {
    const { identifier, password } = req.body;

    const expert = await Expert.findOne({
      $or: [
        { email: identifier.toLowerCase() },
        { expertID: identifier.toUpperCase() },
      ],
    }).select("+password");

    if (!expert) {
      return res.status(400).json({ message: "Expert not found" });
    }

    // Expert.toJSON() strips password; we need raw for comparison
    const rawExpert = await Expert.findById(expert._id).select("+password").lean();
    const isMatch = await bcrypt.compare(password, rawExpert.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { id: expert._id, role: "expert" },
      process.env.JWT_SECRET || "SECRET_KEY",
      { expiresIn: "7d" }
    );

    // Remove password from response
    const expertData = expert.toJSON();

    res.json({ message: "Login successful", expert: expertData, token });
  } catch (error) {
    next(error);
  }
};

/* -------------------------------------------------------------------------- */
/*                         UPDATE EXPERT PROFILE                              */
/* -------------------------------------------------------------------------- */
const updateExpert = async (req, res, next) => {
  try {
    const { id } = req.params;

    const allowedUpdates = {
      fullName: req.body.fullName,
      mobile: req.body.mobile,
      category: req.body.category,
      experience: req.body.experience,
      language: req.body.language,
      serviceArea: req.body.serviceArea,
      profilePhoto: req.body.profilePhoto,
    };

    // Remove undefined keys
    Object.keys(allowedUpdates).forEach(
      (key) => allowedUpdates[key] === undefined && delete allowedUpdates[key]
    );

    const updatedExpert = await Expert.findByIdAndUpdate(id, allowedUpdates, {
      new: true,
      runValidators: true,
    });

    if (!updatedExpert) {
      return res.status(404).json({ message: "Expert not found" });
    }

    res.json(updatedExpert);
  } catch (error) {
    next(error);
  }
};

/* -------------------------------------------------------------------------- */
/*                      TOGGLE AVAILABILITY                                   */
/* -------------------------------------------------------------------------- */
const toggleAvailability = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { availability } = req.body;

    if (typeof availability !== "boolean") {
      return res.status(400).json({ success: false, message: "Availability must be boolean" });
    }

    const expert = await Expert.findById(id);
    if (!expert) {
      return res.status(404).json({ success: false, message: "Expert not found" });
    }

    expert.isAvailable = availability;
    await expert.save();

    res.status(200).json({
      success: true,
      message: `Expert is now ${availability ? "available" : "unavailable"}`,
      expert,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  registerExpert,
  getAllExperts,
  loginExpert,
  updateExpert,
  toggleAvailability,
};
