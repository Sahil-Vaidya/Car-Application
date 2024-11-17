const express = require("express");
const multer = require("multer");
const Car = require("../models/Car");
const { authenticate } = require("../middleware/auth");
const router = express.Router();

// Multer setup
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`),
});
const upload = multer({ storage });

// Middleware to authenticate users
router.use(authenticate);

// Create a car
router.post("/", upload.array("images", 10), async (req, res) => {
  try {
    const { title, description, tags } = req.body;
    const imagePaths = req.files.map((file) => file.filename);
    const car = new Car({
      title,
      description,
      tags: tags.split(",").map((tag) => tag.trim()),
      images: imagePaths,
      userId: req.user.userId,
    });
    await car.save();
    res.status(201).json(car);
  } catch (err) {
    res.status(500).json({ error: "Error creating car" });
  }
});

// Get all cars for the logged-in user
router.get("/user", async (req, res) => {
  try {
    const cars = await Car.find({ userId: req.user.userId });
    res.json(cars);
  } catch (err) {
    res.status(500).json({ error: "Error fetching cars" });
  }
});

// Update a car
router.put("/:id", upload.array("images", 10), async (req, res) => {
  try {
    const { title, description, tags } = req.body;
    const imagePaths = req.files.map((file) => file.filename);
    const updatedData = {
      title,
      description,
      tags: tags.split(",").map((tag) => tag.trim()),
      ...(imagePaths.length > 0 && { images: imagePaths }),
    };

    const car = await Car.findOneAndUpdate(
      { _id: req.params.id, userId: req.user.userId },
      updatedData,
      { new: true }
    );
    if (!car) return res.status(404).json({ error: "Car not found" });

    res.json(car);
  } catch (err) {
    res.status(500).json({ error: "Error updating car" });
  }
});

// Delete a car
router.delete("/:id", async (req, res) => {
  try {
    const car = await Car.findOneAndDelete({ _id: req.params.id, userId: req.user.userId });
    if (!car) return res.status(404).json({ error: "Car not found" });

    res.json({ message: "Car deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: "Error deleting car" });
  }
});

module.exports = router;
