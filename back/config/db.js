const mongoose = require('mongoose');
require('dotenv').config(); // Variables de entorno en .env
const MONGODB_URI = process.env.MONGODB_URI;
const connectDB = async () => {
   try {
      await mongoose.connect(MONGODB_URI, {});
      console.log('Connection to MongoDB successful');
   } catch (error) {
      console.error('Error connecting to MongoDB:', error);
      process.exit(1); // Salir de la aplicación con error
   }
};

module.exports = connectDB;

