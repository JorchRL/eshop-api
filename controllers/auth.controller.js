const config = require("../utils/config");
const logger = require("../utils/logger");
const User = require("../models/User");
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");

const registerUserToDB = (req, res, next) => {
  const newUser = new User({
    username: req.body.username,
    email: req.body.email,
    password: CryptoJS.AES.encrypt(req.body.password, config.PASS_SEC),
  });

  try {
    const savedUser = await User.save();
    res.status(201).json(savedUser);
  } catch (error) {
    logger.error("register error");
    next(error);
  }
};

const loginUser = async (req, res, next) => {
  try {
    const user = await User.findOne({
      username: req.body.username,
    });

    !user &&
      res.status(401).json("Incorrect credentials: user does not exist!");

    const hashedPassword = CryptoJS.AES.decrypt(
      user.password,
      config.PASS_SEC
    );

    const originalPassword = hashedPassword.toString(CryptoJS.enc.Utf8);
    const inputPassword = req.body.password;

    originalPassword !== inputPassword &&
      res.status(401).json("Incorrect credentials: wrong password!");

    // At this point the user is identified and has input the correct password
    // As they are correctly authenticated, we generate a JWT for them

    const accesToken = jwt.sign(
      { id: user._id, isAdmin: user.isAdmin },
      config.JWT_SEC,
      { expiresIn: "3d" }
    );

    // Return the user with the password removed. (TODO: reimplement as User.toJSON())
    const { password, ...others } = user._doc;

    res.status(400).json({ ...others, accessToken });
  } catch (error) {
    logger.error("login error");
    next(error);
  }
};

module.exports = {
  registerUserToDB,
  loginUser,
};
