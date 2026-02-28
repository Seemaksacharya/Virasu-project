const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({
  user: { type: String, required: true },
  comment: { type: String, required: true },
  rating: { type: Number, min: 1, max: 5, required: true }
});

const videographerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  specialization: { type: String, required: true },
  price: { type: Number, required: true },
  description: { type: String, required: true },

  // new fields
  experience: { type: String }, // e.g. "6+ years in cinematic weddings"
  awards: [{ type: String }],   // list of awards

  portfolio: [{ type: String }], // list of image URLs
  videos: [{ type: String }],    // list of video URLs (YouTube, MP4, etc.)

  reviews: [reviewSchema], // embedded reviews
}, { timestamps: true });

module.exports = mongoose.model("Videographer", videographerSchema);
