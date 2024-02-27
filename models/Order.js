const mongoose = require("mongoose");
const OrderSchema = new mongoose.Schema(
  {
    userIds: { type: String, required: true },
    Products: [
      {
        productId: { type: String },
        quantity: { type: Number, default: 1 },
      },
    ],
    amount: { type: Number, required: true },
    adress: { type: Object, required: true },
    status: { type: String, default: "Pending" },
  },
  { timestamps: true }
);
module.exports = mongoose.model("Order", OrderSchema);
