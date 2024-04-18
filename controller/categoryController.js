const CategoryModel = require("../model/categoryModel");
let { category_name } = req.body;

exports.addCategory = async (req, res) => {
  let category = await CategoryModel.findOne({ category_name });
  if (category) {
    return res.status(404).send({ message: "Category already exists" });
  }
  let categoryObj = await CategoryModel.create({
    category_name,
  });
  if (!categoryObj) {
    return res.status(404).send({ message: "Something went wrong" });
  }
  res.send(categoryObj);
};
