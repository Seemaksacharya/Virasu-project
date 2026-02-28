const express = require("express");
const router = express.Router();
const Review = require("../models/Review");

// ✅ Add a new review
router.post("/", async (req, res) => {
  try {
    const { name, email, rating, comment, serviceType } = req.body;
    const newReview = new Review({ name, email, rating, comment, serviceType });
    await newReview.save();
    res.status(201).json({ message: "Review added successfully", review: newReview });
  } catch (error) {
    res.status(500).json({ message: "Error adding review", error });
  }
});

// ✅ Get all reviews
router.get("/", async (req, res) => {
  try {
    const reviews = await Review.find().sort({ createdAt: -1 });
    res.json(reviews);
  } catch (error) {
    res.status(500).json({ message: "Error fetching reviews", error });
  }
});

// ✅ Delete a review (Admin)
router.delete("/:id", async (req, res) => {
  try {
    await Review.findByIdAndDelete(req.params.id);
    res.json({ message: "Review deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting review", error });
  }
});

module.exports = router;
