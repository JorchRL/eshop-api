const router = require("express").Router();
const User = require("../models/User");

// Update an user by id
router.put("/:id", (req, res, next) => []);

// Delete an user by id
router.delete("/:id", (req, res, next) => {});

// Get user by id
router.get("/find/:id", (req, res, next) => {});

// Get all users
router.get("/", (req, res, next) => {});

// Get user stats
router.get("/stats", (req, res, next) => {});

module.exports = router;
