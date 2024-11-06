const Order = require("../models/orderModel");

const createOrder = async (req, res) => {
   const order = new Order({ 
      userID: req.body.userID, 
      totalAmount: req.body.totalAmount, 
      items: req.body.items});

   try {
      await order.save();
   } catch (error) {
      console.error("Error while creating order:", error);
      res.status(500).send("There was an error while creating the order");
   }
};

const getOrderByUsername = async (req,res) => {
   const {username} = req.params;
   const orders = await Order.find({username}).populate("items");

   if (!orders) {
      return res.status(404).send("No orders found for this user");
   }
   res.json(orders);
}

module.exports = {
   createOrder,
   getOrderByUsername
};