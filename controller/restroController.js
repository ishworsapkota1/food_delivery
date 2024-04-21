const RestroModel = require("../model/restroModel");
const TableModel = require("../model/restroChildrens/Table");
//    add
exports.addRestaurant = async (req, res) => {
  // check if already booked or not
  let booked = TableModel.findOne({
    booking: req.body.booked,
  });
  if (booked) {
    return res.status(400).send({ message: "Already booked" });
  }
  res.send({ message: "space available" });
};
//   read
exports.findAllRestros = async (req, res) => {
  let restro = await RestroModel.find();
  if (!restro) {
    return res.status(404).json({ error: "Category not found" });
  }
  res.send(restro);
};
//    update



//   delete
