const express = require("express");
const router = express.Router();
const About = require("../models/About.js");

// Get About
router.get("/", async (req, res) => {
  try {
    const about = await About.findOne();
    res.json(about);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Create/Update About
router.post("/", async (req, res) => {
  try {
    let about = await About.findOne();
    if (about) {
      about.content = req.body.content;
      await about.save();
    } else {
      about = new About({ content: req.body.content });
      await about.save();
    }
    res.json(about);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
