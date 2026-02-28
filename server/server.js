// --- Imports ---
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const bcrypt = require("bcryptjs");

dotenv.config();
const app = express();

// --- Routes imports ---
const userAuthRoutes = require("./routes/userauth.js"); // user login/signup
const adminAuthRoutes = require("./routes/adminAuth"); // admin login
const bookingRoutes = require("./routes/booking.js"); // bookings
const paymentRoute = require("./routes/payment");
const videographerRoutes = require("./routes/videographer");
const userRoutes = require("./routes/userRoutes");
const reviewRoutes = require("./routes/review");


// --- Middleware ---
app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
app.use(express.json()); // parse JSON body

// --- Ensure uploads folder exists ---
const uploadDir = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir);

// --- MongoDB Connection ---
mongoose
  .connect("mongodb://127.0.0.1:27017/posterDB")
  .then(() => console.log("✅ Connected to posterDB"))
  .catch((err) => console.error("❌ DB Connection Error:", err));

// --- JWT Secret ---
const SECRET_KEY = process.env.JWT_SECRET || "mySecretKey123";

// --- Multer Setup (for images) ---
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) =>
    cb(null, Date.now() + path.extname(file.originalname)),
});
const upload = multer({ storage });

// --- Serve uploaded images ---
app.use("/uploads", express.static("uploads"));

// ==============================
// MODELS
// ==============================
const postSchema = new mongoose.Schema(
  {
    title: String,
    subtitle: String,
    poster: String,
    status: { type: String, default: "draft" },
  },
  { timestamps: true }
);
const Post = mongoose.model("Post", postSchema);

const careerSchema = new mongoose.Schema(
  {
    title: String,
    description: String,
    status: { type: String, default: "open" },
  },
  { timestamps: true }
);
const Career = mongoose.model("Career", careerSchema);

const aboutSchema = new mongoose.Schema(
  {
    content: { type: String, required: true },
  },
  { timestamps: true }
);
const About = mongoose.model("About", aboutSchema);

// ==============================
// ROUTES
// ==============================

// --- Auth routes ---
app.use("/api/auth", userAuthRoutes);
app.use("/api/admin", adminAuthRoutes);

// --- Booking routes ---
app.use("/api/bookings", bookingRoutes);
app.use("/api/seedvideographer", videographerRoutes);
app.use("/api/payment", paymentRoute);
app.use("/api/users", userRoutes);
app.use("/api", reviewRoutes);


// --- Post routes ---
app.get("/api/posts", async (req, res) => {
  try {
    const posts = await Post.find();
    res.json(posts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post("/api/posts", upload.single("poster"), async (req, res) => {
  try {
    const newPost = new Post({
      title: req.body.title,
      subtitle: req.body.subtitle,
      poster: req.file ? `/uploads/${req.file.filename}` : null,
      status: req.body.status || "draft",
    });
    await newPost.save();
    res.json(newPost);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.delete("/api/posts/:id", async (req, res) => {
  try {
    const post = await Post.findByIdAndDelete(req.params.id);
    if (!post) return res.status(404).json({ error: "Post not found" });

    if (post.poster) {
      const filePath = path.join(__dirname, post.poster.replace(/^\//, ""));
      if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
    }

    res.json({ message: "Post deleted successfully" });
  } catch (err) {
    console.error("Error deleting post:", err);
    res.status(500).json({ error: "Server error" });
  }
});

// --- Career routes ---
app.get("/api/careers", async (req, res) => {
  try {
    const careers = await Career.find();
    res.json(careers);
  } catch (err) {
    res.status(500).json({ message: "Error fetching careers" });
  }
});

app.post("/api/careers", async (req, res) => {
  try {
    const { title, description } = req.body;
    if (!title || !description)
      return res
        .status(400)
        .json({ message: "Title and description are required" });

    const newCareer = new Career({ title, description });
    await newCareer.save();
    res.status(201).json(newCareer);
  } catch (err) {
    res.status(500).json({ message: "Error adding career" });
  }
});

app.put("/api/careers/:id", async (req, res) => {
  try {
    const { title, description } = req.body;
    if (!title || !description)
      return res
        .status(400)
        .json({ message: "Title and description are required" });

    const updated = await Career.findByIdAndUpdate(
      req.params.id,
      { title, description },
      { new: true }
    );

    if (!updated) return res.status(404).json({ error: "Career not found" });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.delete("/api/careers/:id", async (req, res) => {
  try {
    const deleted = await Career.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: "Career not found" });
    res.json({ message: "Career deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// --- About routes ---
app.get("/api/about", async (req, res) => {
  try {
    const about = await About.findOne();
    res.json(about);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post("/api/about", async (req, res) => {
  try {
    const { content } = req.body;
    let about = await About.findOne();
    if (about) {
      about.content = content;
      await about.save();
    } else {
      about = new About({ content });
      await about.save();
    }
    res.json(about);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ==============================
// START SERVER
// ==============================
const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`🚀 Server running at http://localhost:${PORT}`)
);
