const express = require("express");
const bcrypt = require("bcryptjs");
const router = express.Router();
const jwt = require("jsonwebtoken");
const User = require("../models/User");

// --- Signup ---
router.post("/signup", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // check existing user
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already registered" });
    }

    // hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // save user
    const newUser = new User({ name, email, password: hashedPassword });
    await newUser.save();

    res.status(201).json({ message: "Signup successful", user: newUser });
  } catch (err) {
    console.error("Signup error:", err);
    res.status(500).json({ message: "Server error" });
  }
});
// --- Login ---
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // 1. Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    // 2. Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // 3. jwt Genenpm install jsonwebtokenrate token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    // 4. Send response
    res.json({
      message: "Signin successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ message: "Server error" });
  }
});
module.exports = router;
