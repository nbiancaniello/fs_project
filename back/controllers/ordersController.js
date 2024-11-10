const Order = require("../models/orderModel");

const createOrder = async (req, res) => {
   const order = new Order({
      orderID: req.body.orderID, 
      userID: req.body.userID, 
      totalAmount: req.body.totalAmount, 
      items: req.body.items,
      deliveryOption: req.body.deliveryOption
   });

   try {
      await order.save();
   } catch (error) {
      console.error("Error while creating order:", error);
      res.status(500).send("There was an error while creating the order");
   }
};

const getOrderByUserID = async (req,res) => {
   const {userID} = req.params;
   const orders = await Order.find({userID}).populate("items");

   if (!orders) {
      return res.status(404).send("No orders found for this user");
   }
   res.json(orders);
}

module.exports = {
   createOrder,
   getOrderByUserID
};