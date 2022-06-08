const mongoose = require("mongoose");
const userSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, min: 5, max: 1024 },
    role: { type: String, required: true, default: "Customer" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Users", userSchema);
