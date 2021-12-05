const router = require("express").Router();
const User = require("../models/User");

// Register
router.post("/register", async (request, response, next) => {
  const newUser = new User({
    username: request.body.username,
    email: request.body.email,
    password: request.body.password,
  });

  try {
    const savedUser = await newUser.save();
    response.status(200).json(savedUser);
  } catch (error) {
    // console.log("we have an error");
    next(error);
  }
});

module.exports = router;
