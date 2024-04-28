const router = require("express").Router();
const {
  addRestaurant,
  findAllRestros,
  updateAllRestros,
  deleteRestroByID,
} = require("../controller/restroController");

router.post("/addrestaurant", addRestaurant);
router.get("/findallrestros", findAllRestros);
router.patch("/updateallrestros", updateAllRestros);
router.delete("/deleterestrobyid", deleteRestroByID);

module.exports = router;
