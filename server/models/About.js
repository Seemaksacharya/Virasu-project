const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

// Schema
const aboutSchema = new mongoose.Schema({
  content: { type: String, required: true }
});

const About = mongoose.model("About", aboutSchema);

// GET about content
router.get("/", async (req, res) => {
  try {
    const about = await About.findOne();
    res.json(about || { content: "No about content yet" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// UPDATE about content
router.post("/", async (req, res) => {
  try {
    const { content } = req.body;
    let about = await About.findOne();
    if (about) {
      about.content = content;
    } else {
      about = new About({ content });
    }
    await about.save();
    res.json(about);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
