const express = require("express");
const multer = require("multer");
const path = require("path");
const Post = require("../models/Post");

const router = express.Router();

// --- Multer setup for file upload ---
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // folder for posters
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});
const upload = multer({ storage });

// ✅ Get all posts
router.get("/", async (req, res) => {
  try {
    const posts = await Post.find().sort({ createdAt: -1 });
    res.json(posts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ✅ Create new post
router.post("/", upload.single("poster"), async (req, res) => {
  try {
    const newPost = new Post({
      title: req.body.title,
      subtitle: req.body.subtitle,
      poster: "/uploads/" + req.file.filename,
    });
    await newPost.save();
    res.json(newPost);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ✅ Update post
router.put("/:id", upload.single("poster"), async (req, res) => {
  try {
    const updateData = {
      title: req.body.title,
      subtitle: req.body.subtitle,
    };
    if (req.file) updateData.poster = "/uploads/" + req.file.filename;

    const updatedPost = await Post.findByIdAndUpdate(req.params.id, updateData, { new: true });
    res.json(updatedPost);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ✅ Delete post
router.delete("/:id", async (req, res) => {
  try {
    await Post.findByIdAndDelete(req.params.id);
    res.json({ message: "Post deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
