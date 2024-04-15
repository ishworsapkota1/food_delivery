const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;
const foodSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    price: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    product_image: {
      type: String,
    },
    rating: {
      type: Number,
      default: 1,
    },
    restro: {
      type: ObjectId,
      required: false,
      ref: "Restro",
    },
    category: {
      type: ObjectId,
      ref: "Category",
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("foodModel", foodSchema);
