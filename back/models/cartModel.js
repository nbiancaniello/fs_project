const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
   id: { type: String },
   userID: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User'
   },
   items: {
      type: [Object], // Assuming items is an array of objects
      required: true
   }
});

module.exports = mongoose.model("Cart", cartSchema);