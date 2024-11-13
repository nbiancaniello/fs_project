const express = require("express");
const connectDB = require("./config/db");
const mongoose = require("mongoose");
const path = require("path");
const dotenv = require("dotenv");
const cors = require("cors");
const session = require("express-session");
const productsRoutes = require('./routes/productsRoutes');
const ordersRoutes = require('./routes/ordersRoutes');
const userRoutes = require('./routes/userRoutes');
const cartRoutes = require('./routes/cartRoutes');
const mailRoutes = require('./routes/emailRoutes');

//Cargar variables de entorno 
dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

app.use(session({
   secret: process.env.SESSION_SECRET, 
   resale: false,
   saveUninitialized: true,
   cookie: {secure: false},   
}));

// Middleware para servir archivos estáticos desde la carpeta 'public'
app.use((req, res, next) => {
   res.setHeader('Cross-Origin-Resource-Policy', 'cross-origin');
   next();
 });
app.use('/static',express.static(path.join(__dirname, "public")));

app.use("/api/products", productsRoutes);
app.use("/api/orders", ordersRoutes);
app.use("/api/users", userRoutes);
app.use("/api/carts", cartRoutes);
app.use("/api/mail", mailRoutes);

mongoose.connect(process.env.MONGODB_URI)
.then(() => console.log('Connection to MongoDB successful'))
.catch(err => console.error('Error connecting to MongoDB:', err)); 


//Iniciar el servidor 
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
   console.log(`Server running at ${PORT}`);
})