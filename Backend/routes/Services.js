const express = require("express");
const router = express.Router();
const Service = require("../models/service");

// ✅ Create a new service
router.post("/", async (req, res) => {
  try {
    const { title, description, category, price, provider, image, location } = req.body;

    if (!title || !description || !category || !price || !provider) {
      return res.status(400).json({ error: "All required fields must be provided." });
    }

    const newService = new Service({
      title,
      description,
      category,
      price,
      provider,
      image,
      location,
    });

    const savedService = await newService.save();
    res.status(201).json(savedService);
  } catch (error) {
    console.error("Error creating service:", error);
    res.status(500).json({ error: "Failed to create service." });
  }
});

// ✅ Get all services
router.get("/", async (req, res) => {
  try {
    const services = await Service.find().populate("provider", "name email");
    res.json(services);
  } catch (error) {
    console.error("Error fetching services:", error);
    res.status(500).json({ error: "Failed to fetch services." });
  }
});

// ✅ Get a single service by ID
router.get("/:id", async (req, res) => {
  try {
    const service = await Service.findById(req.params.id).populate("provider", "name email");
    if (!service) return res.status(404).json({ error: "Service not found." });
    res.json(service);
  } catch (error) {
    console.error("Error fetching service:", error);
    res.status(500).json({ error: "Failed to fetch service." });
  }
});

// ✅ Update a service
router.put("/:id", async (req, res) => {
  try {
    const updates = req.body;
    const service = await Service.findByIdAndUpdate(req.params.id, updates, { new: true });
    if (!service) return res.status(404).json({ error: "Service not found." });
    res.json(service);
  } catch (error) {
    console.error("Error updating service:", error);
    res.status(500).json({ error: "Failed to update service." });
  }
});

// ✅ Delete a service
router.delete("/:id", async (req, res) => {
  try {
    const service = await Service.findByIdAndDelete(req.params.id);
    if (!service) return res.status(404).json({ error: "Service not found." });
    res.json({ message: "Service deleted successfully." });
  } catch (error) {
    console.error("Error deleting service:", error);
    res.status(500).json({ error: "Failed to delete service." });
  }
});

module.exports = router;
