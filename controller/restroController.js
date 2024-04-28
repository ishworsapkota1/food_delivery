const RestroModel = require("../model/restroModel");
//    add
exports.addRestaurant = async (req, res) => {
  // create   //
  let restro = await RestroModel.create({
    restro_name: req.body.restro_name,
    address: req.body.address,
  });
  if (!restro) {
    return res.status(400).send({ message: "not available at the moment " });
  }
  res.send(restro);
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
exports.updateAllRestros = async (req, res) => {
  let restro = await RestroModel.findByIdAndUpdate(
    req.params.id,
    {
      restro_name: req.body.restro_name,
    },
    { new: true }
  );
  if (!restro) {
    return res.status(404).json({ error: "Restro not found" });
  }
  res.send(restro);
};
// delete by id
exports.deleteRestroByID = async (req, res) => {
  try {
    let restro = await RestroModel.findByIdAndDelete(req.params.id);
    if (!restro) {
      return res.status(404).json({ error: "error occured" });
    }
    res.send(restro);
  } catch (error) {
    res.status(404).json({ error: error });
  }
};
