const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const BookingSchema = new mongoose.Schema({
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
  restro: {
    type: ObjectId,
    required: false,
    ref: "Restro",
  },
  available_dishes: {
    type: ObjectId,
    ref: "foodModel",
  },
});
module.exports = mongoose.model("BookingModel", BookingSchema);
