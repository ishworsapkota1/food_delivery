const router = require("express").Router();
const { addCategory } = require("../controller/categoryController");

router.post("/addcategory", addCategory);

module.exports = router;
