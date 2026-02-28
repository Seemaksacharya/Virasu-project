const express = require("express");
const Razorpay = require("razorpay");
const router = express.Router();

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID || "YOUR_KEY_ID",
  key_secret: process.env.RAZORPAY_KEY_SECRET || "YOUR_KEY_SECRET",
});

// Create order
router.post("/create-order", async (req, res) => {
  const { amount } = req.body; // amount in paise

  try {
    const options = {
      amount: amount,
      currency: "INR",
      receipt: "receipt_" + Math.floor(Math.random() * 100000),
    };
    const order = await razorpay.orders.create(options);
    res.json(order);
  } catch (err) {
    console.error("Razorpay order creation error:", err);
    res.status(500).json({ error: "Unable to create order" });
  }
});

// Verify payment
router.post("/verify", (req, res) => {
  const crypto = require("crypto");
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

  const hmac = crypto.createHmac("sha256", razorpay.key_secret || process.env.RAZORPAY_KEY_SECRET);
  hmac.update(razorpay_order_id + "|" + razorpay_payment_id);
  const generated_signature = hmac.digest("hex");

  if (generated_signature === razorpay_signature) {
    res.json({ status: "success" });
  } else {
    res.status(400).json({ status: "failure", error: "Invalid signature" });
  }
});

module.exports = router;
