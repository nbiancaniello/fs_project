const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
   id: { type: String, required: true },
   description: { type: String, required: true },
   price: { type: Number, required: true },
   image: { type: String, default: '' },
   category: { type: String, required: true },
   inStock: { type: Boolean, required: false },
   isPromotion: { type: Boolean, required: false },
   isNewArrival: { type: Boolean, required: false },
   isActive: { type: Boolean, default: true },
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;