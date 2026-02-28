const express = require("express");
const router = express.Router();
const User = require("../models/User");
const authMiddleware = require("../middleware/auth"); // checks JWT login

// Get user profile
router.get("/profile", authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).populate("bookings");
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update profile
router.put("/profile", authMiddleware, async (req, res) => {
  try {
    const { name, mobile, city, profilePic } = req.body;
    const user = await User.findByIdAndUpdate(
      req.user.id,
      { name, mobile, city, profilePic },
      { new: true }
    );
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
