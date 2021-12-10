const router = require("express").Router();
const config = require("../utils/config");
const User = require("../models/User");
const CryptoJS = require("crypto-js");
const { request } = require("../app");

// Register a new user to MongoDB
router.post("/register", async (req, res, next) => {
  const newUser = new User({
    username: req.body.username,
    email: req.body.email,
    password: CryptoJS.AES.encrypt(req.body.password, config.PASS_SEC),
  });

  try {
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (error) {
    // console.log("we have an error on api/auth/register");
    next(error);
  }
});

// Login existing user
router.post("/login", async (req, res, next) => {
  try {
    const user = await User.findOne({
      username: req.body.username,
    });

    !user &&
      res.status(401).json("Incorrect credentials: user does not exist!");

    const hashedPassword = CryptoJS.AES.decrypt(user.password, config.PASS_SEC);

    const originalPassword = hashedPassword.toString(CryptoJS.enc.Utf8);
    const inputPassword = req.body.password;

    originalPassword !== inputPassword &&
      res.status(401).json("Incorrect credentials: wrong password!");

    // TODO: replace this hack by defining user.toJSON() in the user model
    const { password, ...others } = user._doc;

    res.status(400).json(others);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
