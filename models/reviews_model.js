const mongoose = require("mongoose");
const reviewsSchema = new mongoose.Schema(
  {
    user: { type: String, required: true },
    product: { type: String, required: true },
    review_description: { type: String, required: true },
    image: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model("reviews", reviewsSchema);
