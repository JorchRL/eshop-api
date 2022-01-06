const router = require("express").Router();

// CONTROLLER
const {
  registerUserToDB,
  loginUser,
} = require("../controllers/auth.controller");

// ROUTES

// Register a new user to MongoDB
router.post("/register", registerUserToDB);

// Login existing user
router.post("/login", loginUser);

module.exports = router;
