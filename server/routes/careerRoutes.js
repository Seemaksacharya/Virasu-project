const express = require("express");
const Career = require("../models/Career");
const router = express.Router();

// GET all careers
router.get("/", async (req, res) => {
  try {
    const careers = await Career.find();
    res.json(careers);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST add new career
router.post("/", async (req, res) => {
  try {
    const { title, description } = req.body;

    if (!title || !description) {
      return res.status(400).json({ message: "Title and description are required" });
    }

    const newCareer = new Career({ title, description });
    const savedCareer = await newCareer.save();
    res.status(201).json(savedCareer);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
