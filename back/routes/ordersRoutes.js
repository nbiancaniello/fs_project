const express = require("express");
const router = express.Router();
const ordersController = require("../controllers/ordersController");

// Route to get all orders by username
router.get("/:userID", ordersController.getOrderByUserID);

// Route to create an order
router.post("/", ordersController.createOrder);

module.exports = router;