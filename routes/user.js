const router = require("express").Router();
const config = require("../utils/config");
const logger = require("../utils/logger");
const User = require("../models/User");
const CryptoJS = require("crypto-js");
const {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require("./verifyToken");

// Update an user by id (auth: User and Admin)
router.put("/:id", verifyTokenAndAuthorization, async (req, res, next) => {
  // Only fully authorized request reach this point

  if (req.body.password) {
    req.body.password = CryptoJS.AES.encrypt(
      req.body.password,
      config.PASS_SEC
    ).toString();
  }

  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );

    res.status(200).json(updatedUser);
  } catch (error) {
    logger.error("Error while updating an user");
    next(error);
  }
});

// Delete an user by id (auth: User and Admin)
router.delete("/:id", verifyTokenAndAuthorization, async (req, res, next) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json("User has been deleted");
  } catch (error) {
    logger.error("Error while deleting an user");
    next(error);
  }
});

// Get user by id
router.get("/find/:id", verifyTokenAndAdmin, async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    res.status(200).json(users);
  } catch (error) {
    next(error);
  }
});

// Get all users
router.get("/", verifyTokenAndAdmin, async (req, res, next) => {
  const query = req.query.new;
  try {
    const users = query
      ? await User.find().sort({ _id: -1 }).limit(5)
      : await User.find();
    res.status(200).json(users);
  } catch (error) {
    next(error);
  }
});

// Get user stats
router.get("/stats", verifyTokenAndAdmin, async (req, res, next) => {
  const date = new Date();
  const lastYear = new Date(date.setFullYear(date.getFullYear() - 1));

  try {
    const data = await User.aggregate([
      { $match: { createdAt: { $gte: lastYear } } },
      {
        $project: {
          month: { $month: "$createdAt" },
        },
      },
      {
        $group: {
          _id: "$month",
          total: { $sum: 1 },
        },
      },
    ]);
    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
