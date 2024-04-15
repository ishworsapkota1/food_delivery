const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },

    isVerified: {
      type: Boolean,
      default: false,
    },

    address: {
      type: ObjectId,
      ref: "Address",
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("UserModel", userSchema);
