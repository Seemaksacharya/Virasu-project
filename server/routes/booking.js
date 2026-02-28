const express = require("express");
const router = express.Router();
const Booking = require("../models/Booking");
const authMiddleware = require("../middleware/auth");

// ✅ GET all bookings (admin only if needed)
router.get("/", async (req, res) => {
  try {
    const bookings = await Booking.find().sort({ createdAt: -1 });
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

// ✅ Create a new booking (user must be logged in)
router.post("/", authMiddleware, async (req, res) => {
  try {
    const { name, email, mobile, city, videographer, specialization, date, message } = req.body;

    const newBooking = new Booking({
      user: req.user.id, // ✅ ensure this line exists
      name,
      email,
      mobile,
      city,
      videographer,
      specialization,
      date,
      message,
      status: "Confirmed",
    });

    await newBooking.save();
    res.status(201).json({ message: "Booking successful!" });
  } catch (err) {
    res.status(500).json({ error: "Server error while saving booking" });
  }
});


// ✅ Get bookings by user ID (protected)
router.get("/user/:userId", authMiddleware, async (req, res) => {
  try {
    const userId = req.params.userId;
    const bookings = await Booking.find({ user: userId }).sort({ createdAt: -1 });
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch user bookings" });
  }
});


// ✅ Cancel a booking (only by the same user)
router.post("/cancel/:id", authMiddleware, async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);
    if (!booking) return res.status(404).json({ message: "Booking not found" });

    if (booking.user.toString() !== req.user.id)
      return res.status(403).json({ message: "Not authorized" });

    booking.status = "Cancelled";
    await booking.save();

    res.json({ message: "Booking cancelled successfully", booking });
  } catch (err) {
    console.error("Cancel error:", err);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
