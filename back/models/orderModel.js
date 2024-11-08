const mongoose = require('mongoose');
const productSchema = require('./productModel').productSchema;
const localDate = new Date();

const orderSchema = new mongoose.Schema({
  dateIssued: {
    type: Date,
    required: true,
    default: localDate.setHours(localDate.getHours() - 5)
  },
  userID: {
    type: String,
    required: true
  },
  totalAmount: {
    type: Number,
    required: true,
    min: 0
  },
  items: {
    type: [productSchema],
    required: true
  }
});

const order = mongoose.model('Order', orderSchema);

module.exports = order;