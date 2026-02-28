const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    subtitle: { type: String, required: true },
    poster: { type: String, required: true }, // store image path
  },
  { timestamps: true }
);

module.exports = mongoose.model("Post", PostSchema, "posts");
