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
router.post("/verifyuser/:token", verifyUser);
router.post("/resendverification", resendVerification);
router.post("/forgotpassword", forgotPassword);
router.post("/resetpassword", resetPassword);
router.post("/login", login);
router.get("/logout", logout);
router.get("/getuserlist", getUserList);

module.exports = router;
