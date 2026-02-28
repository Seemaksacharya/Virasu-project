// routes/adminAuth.js
const express = require("express");
const jwt = require("jsonwebtoken");
const router = express.Router();

const SECRET_KEY = process.env.JWT_SECRET || "mySecretKey";

// hardcoded admin credentials (for now)
const ADMIN_USER = "virasu";
const ADMIN_PASS = "123456";

// @route POST /api/admin/login
router.post("/login", (req, res) => {
  const { username, password } = req.body;

  if (username === ADMIN_USER && password === ADMIN_PASS) {
    const token = jwt.sign({ role: "admin" }, SECRET_KEY, { expiresIn: "1h" });
    return res.json({ token });
  } else {
    return res.status(401).json({ error: "Invalid credentials" });
  }
});

module.exports = router;
