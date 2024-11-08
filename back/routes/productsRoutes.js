const express = require("express");
const router = express.Router();
const productsController = require("../controllers/productsController");

// Route to get all products
router.get("/", productsController.getAllProducts);

// Route to get a product by ID
router.get("/:id", productsController.getProductById);

// Route to get a product by category
router.get("/category/:category", productsController.getProductByCategory);

module.exports = router;