const router = require("express").Router();
const config = require("../utils/config");
const logger = require("../utils/logger");

const Product = require("../models/Product");
const { verifyTokenAndAdmin } = require("./verifyToken");

// CONTROLLER
const {
  addProduct,
  updateProductById,
  deleteProductById,
  getProductById,
  getAllProducts,
} = require("../controllers/product.controller");

// ROUTES

// Add new product (as admin)
router.post("/", verifyTokenAndAdmin, addProduct);

// Update an existing product by id (as admin)
router.put("/:id", verifyTokenAndAdmin, updateProductById);

// Delete a product by id (as admin)
router.delete("/:id", verifyTokenAndAdmin, deleteProductById);

// Get product by id
router.get("/find/:id", getProductById);

// Get all products
router.get("/", getAllProducts);

module.exports = router;
