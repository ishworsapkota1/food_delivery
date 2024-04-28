const UserModel = require("../model/userModel");
const AddressModel = require("../model/addressModel");
const TokenModel = require("../model/tokenModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");  
const sendEmail = require("../utils/emailSender");
const { expressjwt } = require("express-jwt");

exports.register = async (req, res) => {
  let {
    username,
    email,
    password,
    isVerified,
    gender,
    street,
    city,
    state,
    zipcode,
  } = req.body;
  // check if username already exists
  let user = await UserModel.findOne({ username });
  if (user) {
    return res.status(400).send({ error: "Username already exists" });
  }
  //   check if email already exists
  user = await UserModel.findOne({ email });
  if (user) {
    return res
      .status(400)
      .send({ error: "Email already exists,please login to continue" });
  }
  //record the address with id
  let address = await AddressModel.create({
    street,
    city,
    state,
    zipcode,
    phone,
  });
  if (!address) {
    return res
      .status(400)
      .send({ error: "Something went wrong,please try again later" });
  }
  // encrypt the password
  let salt = await bcrypt.genSalt(10);
  let hashed_password = await bcrypt.hash(password, salt);
  //   register
  let new_user = await UserModel.create({
    username,
    email,
    password: hashed_password,
    address: address._id,
  });

  if (!new_user) {
    return res.status(400).send({ error: "Failed to register" });
  }
  res.send({ new_user });
};

// generate token
let token = await TokenModel.create({
  token: crypto.randomBytes(24).toString("hex"),
  user: new_user._id,
});

// send verification link

const url = `http://localhost:4000/api/verifyuser/${token.token}`;
sendEmail({
  from: "noreply@something.com",
  to: email,
  subject: "Verification email",
  text: `Copy paste the link in the browser to verify the account. ${url}`,
  html: `<a href= '/verify/${url}><button>Verify account</button></a>`,
});
if (!new_user) {
  return res.status(400).send({ error: "Failed to register" });
}
res.send({ new_user });

// to verify user
exports.verifyUser = async (req, res) => {
  // check token if valid or not
  let token = await TokenModel.findOne({ token: req.params.token });
  if (!token) {
    return res
      .status(400)
      .send({ error: "Invalid token or token may have expired" });
  }
  // find user
  let user = await UserModel.findById(token.user);
  if (!user) {
    return res
      .status(400)
      .json({ error: "user associated with this token not found" });
  }
  // check if already verified
  if (user.isVerified) {
    return res
      .status(200)
      .send({ error: "User already verified, login to continue" });
  }

  // verify user
  user.isVerified = true;
  user = await user.save();
  if (!user) {
    return res
      .status(400)
      .send({ error: "Failed to verify, please try again later" });
  }
  res.send({ message: "User verified successfully" });
};
// resend verification
exports.resendVerification = async (req, res) => {
  // find if email is registered or not
  let user = await UserModel.findOne({ email: req.body.email });
  if (!user) {
    return res.status(400).send({ error: "Email not found" });
  }
  // check if password is valid or not
  let passwordCheck = await bcrypt.compare(req.body.password, user.password);
  if (!passwordCheck) {
    return res.status(400).json({ error: "Email and password do not match" });
  }
  // check if user is already verified
  if (user.isVerified) {
    return res
      .status(400)
      .send({ error: "User already verified,login to continue" });
  }
  // generate token, send verification link in email
  // ------------------------------------
  let token = await TokenModel.create({
    token: crypto.randomBytes(24).toString("hex"),
    user: user._id,
  });
  if (!token) {
    return res.status(400).send({ error: "Something went wrong" });
  }
  const url = `http://localhost:4000/api/verifyuser/${token.token}`;
  sendEmail({
    from: "noreply@something.com",
    to: req.body.email,
    subject: "Verification email",
    text: `Please click on the following link or copy paste the link in the browser to vefrifhyy the account. ${url}`,
    html: `<a href= '${url}'> <button> Verify account </button> </a>`,
  });
  res.send({ message: "Verification link has been sent to your email " });
};

// forgot password
exports.forgotPassword = async (req, res) => {
  // find if email is registered or not
  let user = UserModel.findOne({ email: req.body.email });
  if (!user) {
    return res.status(400).send({ error: "Email not registered" });
  }
  // generate token, send verification link in email
  let token = await TokenModel.create({
    token: crypto.randomBytes(24).toString("hex"),
    user: user._id,
  });
  if (!token) {
    return res.status(400).send({ error: "Something went wrong" });
  }
  const url = `http://localhost:4000/api/resetpassword/${token.token}`;
  sendEmail({
    from: "noreply@something.com",
    to: req.body.email,
    subject: "Reset Password",
    text: `Please click on the following link or copy paste the link in the browser to reset your password ${url}`,
    html: `<a href= '${url}'> <button>Reset password</button></a>`,
  });
  res.send({ message: "password reset link has been sent to your email " });
};
// reset password
exports.resetPassword = async (req, res) => {
  // check token
  let token = await TokenModel.findOne({ token: req.params.token });
  if (!token) {
    return res
      .status(400)
      .send({ error: "Invalid token or token may have expired" });
  }
  // find user
  let user = await UserModel.findById(token.user);
  if (!user) {
    return res.status(400).send({ error: "Something went wrong" });
  }
  // change password
  // let salt_rounds = await bcrypt.genSalt(10);
  // user.password = await bcrypt.hash(req.body.password, salt_rounds);
  // user = await user.save();
  // if (!user) {
  //   return res.status(400).json({ error: "Something went wrong" });
  // }
  // res.send({ message: "Password has been changed successfully" });
};
// login
exports.login = async (req, res) => {
  //check if email is registered or not
  let users = await UserModel.findOne({ email: req.body.email });
  if (!users) {
    return res.status(400).send({ error: "Email not registered" });
  }
  // check if password is correct or not
  let passwordCheck = await bcrypt.compare(password, user.password);
  if (!passwordCheck) {
    return res.status(400).json({ error: "Email and password do not match" });
  }
  // check if verified or not
  if (!users.isVerified) {
    return res.status(400).send({ error: "User not verified, verifiy first" });
  }
  // generate token
  let { username, role, _id } = user;
  let token = jwt.sign({ username, role, _id }, process.env.JWT_SECRET, {
    expiresIn: 86400,
  });
  // send data to frontend
  res.cookie("myCookie", token, { expiresIn: 86400 });
  res.send({ token, user: { _id, username, role, email } });
};
// logout
exports.logout = async (req, res) => {
  res.clearCookie("myCookie");
  res.send({ message: "Signed out successfully" });
};
// user list
exports.getUserList = async (req, res) => {
  let users = await UserModel.find();
  if (!users) {
    return res.status(400).send({ error: "Something went wrong" });
  }
  res.send(users);
};
// authorized login
exports.authorizedlogin = (req, res, next) =>
  expressjwt({
    algorithms: ["HS256"],
    secret: process.env.JWT_SECRET,
  })(req, res, (error) => {
    if (error) {
      return res.status(500).json({ error: "Login to continue" });
    }
    next();
  });
//  check whether admin or not
exports.checkAdmin = (req, res, next) =>
  expressjwt({
    algorithms: ["HS256"],
    secret: process.env.JWT_SECRET,
    userProperty: "auth",
  })(req, res, (error) => {
    if (error) {
      return res.status(400).json({ error, error });
    } else if (req.auth.role === 1) {
      next();
    } else {
      res.status(400).json({ error: "Unauthorized access" });
    }
  });
