const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const restroSchema = new mongoose.Schema(
  {
    restro_name: {
      type: String,
      required: true,
      trim: true,
    },

    address: {
      type: ObjectId,
      ref: "Address",
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("Restro", restroSchema);
