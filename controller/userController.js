const UserModel = require("../model/userModel");
const AddressModel = require("../model/addressModel");
const TokenModel = require("../model/tokenModel");
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

// send verification link
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
  // check if user is already verified
  if (user.isVerified) {
    return res
      .status(400)
      .send({ error: "User already verified,login to continue" });
  }
  // generate token, send verification link in email
  // ------------------------------------
  // let token = await TokenModel.create({
  //   token: crypto.randomBytes(24).toString("hex"),
  //   user: user._id,
  // });
  // if (!token) {
  //   return res.status(400).send({ error: "Something went wrong" });
  // }
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
};
// login
exports.login = async (req, res) => {
  //check if email is registered or not
  let users = await UserModel.findOne({ email: req.body.email });
  if (!users) {
    return res.status(400).send({ error: "Email not registered" });
  }
  // check if password is correct or not
  // check if verified or not
  if (!users.isVerified) {
    return res.status(400).send({ error: "User not verified, verifiy first" });
  }
  // generate token
};
// logout
exports.logout = async (req, res) => {
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
