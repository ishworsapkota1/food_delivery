const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const TableSchema = new mongoose.Schema({
  customer: {
    type: ObjectId,
    ref: "UserModel",
    required: true,
  },
  address: {
    type: ObjectId,
    ref: "AddressModel",
    required: true,
  },
  capacity: {
    type: String,
    required: true,
  },
  restro: {
    type: ObjectId,
    required: false,
    ref: "Restro",
  },
});
module.exports = mongoose.model("TableModel", TableSchema);
