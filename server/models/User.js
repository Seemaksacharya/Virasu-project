const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },

    // Profile Info
    mobile: { type: String, default: "" },
    city: { type: String, default: "" },
    profilePic: { type: String, default: "" }, // store image URL if needed

    // Relationship
    bookings: [{ type: mongoose.Schema.Types.ObjectId, ref: "Booking" }],
  },
  { timestamps: true } // createdAt, updatedAt
);

module.exports = mongoose.model("User", UserSchema);
