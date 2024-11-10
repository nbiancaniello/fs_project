const Cart = require("../models/cartModel");

// Route to get
const getCartByUserID = async (req,res) => {
   try {
      let userID = req.params.id.replace(/^:/, '');
      let cart = await Cart.findOne({ userID: userID })
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
      let userID = req.params.id.replace(/^:/, '');
      let cart = await Cart.findOne({ userID: userID })
      const itemsArray = req.body;
      if (!cart) {
         cart = new Cart({
            userID: userID,  // Ensure userId is set
            items: itemsArray || []  // Set items or an empty array if not provided
         });
         const newCart = await cart.save();
         res.json(newCart);
      } else {
         if (itemsArray.length > 0)  {
            cart.items = itemsArray;
            const updatedCart = await cart.save();
            res.json(updatedCart);
         }
         else {
            let deletedCart = await Cart.findOneAndDelete({ userID: userID });
            res.json(deletedCart);
         }

      }
   } catch (error) {
      console.error("Error while updating Cart:", error);
      res.status(500).send("There was an error while updating the Cart");
   }
};

module.exports = {
   getCartByUserID,
   updateCart
};