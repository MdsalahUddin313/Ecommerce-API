const mongoose = require("mongoose");
const productSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, unique: true },
    description: { type: String, required: true},
    img: { type: String, required: true,},
    categories: {type: Array },
    size: { type: String },
    color: { type: String},
    price : {type : String ,required: true, default : "0.00"}
  },
  { timestamps: true }
);

module.exports = mongoose.model("Products", productSchema);
