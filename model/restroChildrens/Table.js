const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const TableSchema = new mongoose.Schema({
  customer: {
    type: ObjectId,
    ref: "UserModel",
    required: true,
  },

  capacity: {
    type: String,
    required: true,
  },
  availability: {
    type: Boolean,
    required: true,
  },
  restro: {
    type: ObjectId,
    required: false,
    ref: "RestroModel",
  },
  booked: {
    type: Boolean,
    required: true,
  },
});
module.exports = mongoose.model("TableModel", TableSchema);
