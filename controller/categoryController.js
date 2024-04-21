const CategoryModel = require("../model/categoryModel");

// add category
exports.addCategory = async (req, res) => {
  let { category_name } = req.body;
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

// read category
exports.getAllCategory = async (req, res) => {
  let categories = await CategoryModel.find();
  if (!categories) {
    return res.status(404).json({ error: "Category not found" });
  }
  res.send(categories);
};

// to get categoryDetails
exports.getCategoryDetails = async (req, res) => {
  let category = await CategoryModel.findById(req.params.id);
  if (!category) {
    return res.status(404).json({ error: "Category not found" });
  }
  res.send(category);
};

// update category
exports.updateCategory = async (req, res) => {
  let categoryToUpdate = await CategoryModel.findByIdAndUpdate(
    req.params.id,
    {
      category_name: req.body.category_name,
    },
    { new: true }
  );
  if (!categoryToUpdate) {
    return res.status(404).json({ error: "Category not found" });
  }
  res.send(categoryToUpdate);
};

// delete category
exports.deleteCategory = async (req, res) => {
  try {
    let deletedCategory = await CategoryModel.findByIdAndDelete(req.params.id);
    if (!deletedCategory) {
      return res.status(404).json({ error: "error occured" });
    }
    res.send(deletedCategory);
  } catch (error) {
    res.status(404).json({ error: error });
  }
};
