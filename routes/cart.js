const router = require("express").Router();

const {
  updateCartById,
  createCart,
  deleteCartById,
  getCartById,
  getAllCarts,
} = require("../controllers/cart.controller");
const {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require("./verifyToken");

// Create cart (user)
router.post("/", verifyToken, createCart);

// Update cart (user authorized)
router.put("/:id", verifyTokenAndAuthorization, updateCartById);

// Delete cart (user authorized)
router.delete("/:id", verifyTokenAndAuthorization, deleteCartById);

// Get the user's cart (user authorized)
router.get("/find/:userId", verifyTokenAndAuthorization, getCartById);

// Get all carts (as admin)
router.get("/", verifyTokenAndAdmin, getAllCarts);

module.exports = router;
