const express  = require("express");
const router = express.Router();
const usersController = require("../controllers/usersController");
const User = require("../models/userModel");
const bcrypt = require("bcrypt");

// Route to create a new user
router.post("/register", async(req,res) => {
   const {username, password} = req.body;

   try{
      const existingUser = await User.findOne({username});
      if(existingUser){
         return res.status(400).send("User already exists");
      }
   
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = new User({
         username,
         password: hashedPassword
      });
      await newUser.save();
      res.status(201).send("User created successfully");
   }catch(err){
      console.error("Error creating user:", err);
   }
});

// Route to login a user
router.post("/login", async(req,res) => {
   const {username, password} = req.body;

   try{
      const user = await User.findOne({username});
      if(!user){
         return res.status(400).send("User not found");
      }
      const isPasswordCorrect = await bcrypt.compare(password, user.password);
      if(!isPasswordCorrect){
         return res.status(400).send("Incorrect password");
      }
      req.session.user = user._id;
      res.status(200).send({ message: "Login successful", userID: user._id });
   }catch(err){
      console.error("Error logging in:", err);
   }
});

// Route to logout a user
router.get("/logout", (req,res) => {

   // usersController.updateUserCart(req, res);

   req.session.destroy( err => {
      if(err){
         return res.status(500).send("Error logging out:");
      }
      res.status(200).send("Logout successful");
   });
});

// Protected route (to check if user is logged in)
router.get("/protected", (req,res) => {
   if(req.session.user){
      res.status(200).send("User is logged in");
   }else{
      res.status(401).send("User is not logged in");
   }
});

router.get("/:id", usersController.getUserByID);

// Route to create an order
router.put("/:id", usersController.updateUserByID);

module.exports = router;