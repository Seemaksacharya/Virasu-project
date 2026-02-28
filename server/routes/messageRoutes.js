const express = require('express');
const router = express.Router();
const Message = require('../models/Message');

router.post('/contact', async (req, res) => {
  try {
    const { name, email, message } = req.body;

    const newMessage = new Message({ name, email, message });
    await newMessage.save();

    res.status(201).json({ success: true, message: "Message sent successfully!" });
  } catch (err) {
    res.status(500).json({ success: false, error: "Server error" });
  }
});

module.exports = router;
