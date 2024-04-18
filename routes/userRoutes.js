const {
  register,
  verifyUser,
  resendVerification,
  forgotPassword,
  resetPassword,
  login,
  logout,
  getUserList,
} = require("../controller/userController");
const router = require("express").Router();

router.post("/register", register);
router.post("/verifyUser", verifyUser);
router.post("/resendverification", resendVerification);
router.post("/forgotPassword", forgotPassword);
router.post("/resetPassword", resetPassword);
router.post("/login", login);
router.get("/logout", logout);
router.get("/getuserList", getUserList);

module.exports = router;
