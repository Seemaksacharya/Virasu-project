const mongoose = require("mongoose");

const BookingSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    name: { type: String, required: true },
    email: { type: String, required: true },
    mobile: { type: String, required: true },
    city: { type: String, default: "" },
    videographer: { type: String, required: true },
    specialization: { type: String, required: true },
    date: { type: Date, required: true },
    message: { type: String, default: "" },

    status: {
      type: String,
      enum: ["Pending", "Confirmed", "Cancelled", "Completed"],
      default: "Pending",
    },

    paymentId: { type: String },
    amount: { type: Number, default: 0 },
    paymentStatus: {
      type: String,
      enum: ["Pending", "Paid", "Refunded"],
      default: "Pending",
    },

    cancelledAt: { type: Date },
    refundId: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Booking", BookingSchema);
