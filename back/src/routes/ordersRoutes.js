const express = require("express");
const router = express.Router();
const ordersController = require("../controllers/ordersController");

// Route to get all orders by username
router.get("/:username", ordersController.getOrderByUsername);

// Route to create an order
router.post("/", ordersController.createOrder);

module.exports = router;