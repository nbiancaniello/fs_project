const express = require("express");
const router = express.Router();
const cartsController = require("../controllers/cartsController");

// Route to get cart by ID
router.get("/:id", cartsController.getCartByID);

// Route to save cart
router.put("/:id", cartsController.updateCart);

// Route to delete cart
router.delete("/:id", cartsController.deleteCart);

module.exports = router;
