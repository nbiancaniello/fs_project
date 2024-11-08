const mongoose = require("mongoose");
const Product = require("../models/productModel");

// Get all products
const getAllProducts = async (req, res) => {
   try {
      const allProducts = await Product.find();
      res.json(allProducts);
   } catch (err) {
      console.error("Error fetching products:", err);
      res.status(500).send("Error fetching products");
   }
};

const getProductById = async (req, res) => {
   try {
      const product = await Product.findById(req.params.id);
      if (!product) {
         return res.status(404).send("Product not found");
      }
      res.json(product);

   } catch (error) {
      console.error("Error while getting product:", error);
      res.status(500).send("There was an error while getting the product");
   }
};

const getProductByCategory = async (req, res) => {
   const { category } = req.params;
   try {
      const product = await Product.find({category});
      if (!product) {
         return res.status(404).send("No products found in this category");
      }
      res.json(product);

   } catch (error) {
      console.error("Error while getting product:", error);
      res.status(500).send("There was an error while getting the product by category");
   }
};

module.exports = {
   getAllProducts,
   getProductById,
   getProductByCategory,
};