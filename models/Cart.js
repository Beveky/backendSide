const mongoose = require("mongoose");
const CartSchema = new mongoose.Schema(
  {
    userIds: { type: String, required: true },
    Products: [
      {
        productId: { type: String },
        quantity: { type: Number, default: 1 },
      },
    ],
  },
  { timestamps: true }
);
module.exports = mongoose.model("Cart", CartSchema);
