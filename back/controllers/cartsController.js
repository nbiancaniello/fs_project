const Cart = require("../models/cartModel");

// Route to get
const getCartByID = async (req,res) => {
   try {
      let cartId = req.params.id.replace(/^:/, '');
      const cart = await Cart.findById(cartId);
      if (!cart) {
         return res.status(404).send("No Cart found for this User");
      }
      res.json(cart);

   } catch (error) {
      console.error("Error while getting Cart:", error);
      res.status(500).send("There was an error while getting the Cart");
   }
};

const updateCart = async (req, res) => {
   try {
      let userId = req.params.id.replace(/^:/, '');
      var cart = await Cart.findById(userId);
      const { itemsArray } = req.body;
      if (!cart) {
         cart = new Cart({
            userId: userId,  // Ensure userId is set
            items: itemsArray || []  // Set items or an empty array if not provided
         });
         const newCart = await cart.save();
         res.json(newCart);
      } else {
         if (itemsArray !== undefined)  {
            cart.items = itemsArray;
         }
         // else {
         //    //await Cart.findByIdAndDelete(userId);
         // }

         const updatedCart = await Cart.save();
         res.json(updatedCart);
      }
   } catch (error) {
      console.error("Error while updating Cart:", error);
      res.status(500).send("There was an error while updating the Cart");
   }
};

const deleteCart = async (req, res) => {
   try {
      const deletedCart = await Cart.findByIdAndDelete(req.params.id);
      res.json(deletedCart);
   } catch (error) {
      console.error("Error while deleting Cart:", error);
      res.status(500).send("There was an error while deleting the Cart");
   }
};

module.exports = {
   getCartByID,
   updateCart,
   deleteCart
};