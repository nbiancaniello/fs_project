const express = require("express");
const router = express.Router();
const cartsController = require("../controllers/cartsController");

// Route to get cart by ID
router.get("/:id", cartsController.getCartByUserID);

// Route to save cart
router.put("/:id", cartsController.updateCart);

module.exports = router;
