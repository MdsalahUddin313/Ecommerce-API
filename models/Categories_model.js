const mongoose = require("mongoose");
const categoriesSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, unique: true },
    sub_categories: { type: Array },
    logos: { type: String },
  },
  { timestamps: true }
);
module.exports = mongoose.model("categories", categoriesSchema);
