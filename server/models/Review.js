// models/Review.js
const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
    },
    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },
    comment: {
      type: String,
      required: true,
      trim: true,
    },
    serviceType: {
      type: String,
      enum: [
        "Wedding Photography",
        "Corporate Shoot",
        "Portrait Session",
        "Other",
      ],
      default: "Other",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Review", reviewSchema);
