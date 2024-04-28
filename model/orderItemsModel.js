const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;
const orderItemSchema = new mongoose.Schema(
  {
    product: {
      type: ObjectId,
      ref: "ProductModel",
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("OrderItems", orderItemSchema);
