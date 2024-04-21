const router = require("express").Router();
const {
  addCategory,
  getAllCategory,
  getCategoryDetails,
  updateCategory,
  deleteCategory,
} = require("../controller/categoryController");

router.post("/addcategory", addCategory);
router.get("/getallcategory", getAllCategory);
router.get("/getcategorydetails/:id", getCategoryDetails);
router.patch("/updatecategory/:id", updateCategory);
router.delete("/deletecategory/:id", deleteCategory);

module.exports = router;
