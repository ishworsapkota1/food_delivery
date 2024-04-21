const FoodModel = require("../model/foodModel");

// create
exports.addFood = async (req, res) => {
  let food = await FoodModel.create({
    title: req.body.title,
    price: req.body.price,
    description: req.body.description,
    product_image: req.body.product_image,
    rating: req.body.rating,
    restro: req.body.restro,
    category: req.body.category,
  });
  if (!food) {
    res.status(404).send({ error: error.message });
  }
  res.send(food);
};
// getallfoods
exports.getAllfoods = async (req, res) => {
  let food = await FoodModel.find();
  if (!food) {
    return res.status(404).send({ error: error.message });
  }
  res.send(food);
};
// getfooddetails
exports.getFoodDetails = async (req, res) => {
  let food = await FoodModel.findById(req.params.id);
  if (!food) {
    return res.status(404).send({ error: "Something went wrong" });
  }
  res.send(food);
};
// get food on the basis of category
exports.getFoodsByCategory = async (req, res) => {
  let food = await FoodModel.find({
    category: req.params.category_id,
  });
  if (!food) {
    return res.status(404).send({ error: "Something went wrong" });
  }
  res.send(food);
};
// delete or cancel the food
exports.cancelFood = async (req, res) => {
  let food = await FoodModel.findByIdAndDelete(req.params.id);
  if (!food) {
    return res.status(404).send({ error: "Something went wrong" });
  }
  res.send({ message: "Food cancelled" });
};
