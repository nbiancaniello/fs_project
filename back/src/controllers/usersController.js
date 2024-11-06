const User = require("../models/userModel");

// Route to get 
const getUserByID = async (req,res) => {
   try {
      const user = await User.findById(req.params.id);
      if (!user) {
         return res.status(404).send("No User found for this user");
      }
      res.json(user);

   } catch (error) {
      console.error("Error while getting User:", error);
      res.status(500).send("There was an error while getting the User");
   }
};

// Route to update a User information
const updateUserByID = async (req, res) => {
   try {
      const user = await User.findById(req.params.id);
      if (!user) {
         return res.status(404).send("No User found");
      }

      user.firstName = req.body.firstName !== undefined ? req.body.firstName : user.firstName;
      user.lastName = req.body.lastName !== undefined ? req.body.lastName : user.lastName;
      user.email = req.body.email !== undefined ? req.body.email : user.email;
      user.phone = req.body.phone !== undefined ? req.body.phone : user.phone;
      user.address = req.body.address !== undefined ? req.body.address : user.address;
      // user.defaultPayment = req.body.defaultPayment !== undefined ? req.body.defaultPayment : user.defaultPayment;

      // Save the updated User document
      const updatedUser = await user.save();
      res.json(updatedUser);      
   } catch (error) {
      console.error("Error while updating User:", error);
      res.status(500).send("There was an error while updating the User");
   }
};

module.exports = {
   getUserByID,
   updateUserByID,
};