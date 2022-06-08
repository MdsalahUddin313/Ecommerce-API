const mongoose = require("mongoose");

const searchItemsSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true },
    searchItems: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model("searchItems", searchItemsSchema);
