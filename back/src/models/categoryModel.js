const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
   description: { type: String, required: true },
   isActive: { type: Boolean, default: true },
});

const Category = mongoose.model("Category", categorySchema);

module.exports = Category;