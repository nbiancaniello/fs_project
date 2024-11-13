const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
   id: { type: String },
   username: { type: String,  required: true, unique: true },
   password: { type: String, required: true },
   firstName: { type: String, required: false },
   lastName: { type: String, required: false },
   email: { type: String, required: false, match: /.+\@.+\..+/, unique: true },
   phone: { type: String, required: false, unique: true },
   address: { type: String, required: false },
   defaultPaymentType: { type: String, required: false },
   isActive: { type: Boolean, default: true },
   emailVerified: { type: Boolean, default: false },
});

module.exports = mongoose.model("User", userSchema);