const router = require("express").Router();
const {
  addFood,
  getAllfoods,
  getFoodDetails,
  getFoodsByCategory,
  cancelFood,
} = require("../controller/foodController");

router.post("/addfood", addFood);
router.get("/getallfoods", getAllfoods);
router.get("/getfooddetails/:id", getFoodDetails);
router.get("/getfoodsbycategory/:category_id", getFoodsByCategory);
router.delete("/cancelfood/:id", cancelFood);

module.exports = router;
