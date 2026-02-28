const express = require("express");
const router = express.Router();
const multer = require("multer");
const Videographer = require("../models/Videographer"); // adjust path

// Multer setup
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});
const upload = multer({ storage });

// POST add videographer
router.post("/", upload.single("photo"), async (req, res) => {
  try {
    const { name, specialization, price } = req.body;
    const photo = req.file ? "/uploads/" + req.file.filename : null;

    const newVideographer = new Videographer({
      name,
      specialization,
      price,
      photo,
    });

    await newVideographer.save();
    res.status(201).json(newVideographer);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to save videographer" });
  }
});

// GET all videographers
router.get("/", async (req, res) => {
  try {
    const videographers = await Videographer.find();
    res.json(videographers);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch videographers" });
  }
});

module.exports = router;

// DELETE videographer by ID
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Videographer.findByIdAndDelete(id);

    if (!deleted) {
      return res.status(404).json({ message: "Videographer not found" });
    }

    res.json({ message: "Videographer deleted successfully" });
  } catch (err) {
    console.error("Delete error:", err);
    res.status(500).json({ message: "Failed to delete videographer" });
  }
});