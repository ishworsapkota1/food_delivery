const OrderModel = require("../model/orderModel");
const OrderItemsModel = require("../model/orderItemsModel");
const UserModel = require("../model/userModel");

// place order
exports.placeOrder = async (req, res) => {
  req.body.orderItems.map(async (OrderItem) => {
    let orderItem = await OrderItemsModel.create({
      product: OrderItem.product,
      quantity: OrderItem.quantity,
    });
    if (!orderItem) {
      return res.status(400).send({ message: "something went wrong" });
    }
  });
};
