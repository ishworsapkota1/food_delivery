const UserModel = require("../model/userModel");
const AddressModel = require("../model/addressModel");

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
    gender,
    date_of_birth,
    address: address._id,
  });
  if (!new_user) {
    return res.status(400).send({ error: "Failed to register" });
  }
  res.send({ new_user });
};
