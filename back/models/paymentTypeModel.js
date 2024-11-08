const mongoose = require("mongoose");

const paymentTypeSchema = new mongoose.Schema({
   description: { type: String, required: true },
   isActive: { type: Boolean, default: true },
});

const PaymentType = mongoose.model("PaymentType", paymentTypeSchema);

module.exports = PaymentType;