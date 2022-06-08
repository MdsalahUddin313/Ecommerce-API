const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true },
    products: [
      {
        productId: { type: String },
        quantity: { type: Number, default: 1 },
      },
    ],
    amount: { type: String, required: true },
    address: { type: String, required: true },
    status: { type: String, default: "pending" },
    payment_method: { type: String, default: "Cash" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order_Products", OrderSchema);
