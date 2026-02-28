const mongoose = require("mongoose");

const careerSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true,
    trim: true
  },
  skills: {
    type: [String], // array of skills
    default: []
  },
  experience: {
    type: String
  },
  education: {
    type: String
  },
  location: {
    type: String
  },
  salary: {
    type: String
  }
}, { timestamps: true });

module.exports = mongoose.model("Career", careerSchema);
