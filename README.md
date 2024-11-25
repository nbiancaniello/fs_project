*** ENGLISH FOLLOWS NEXT ***

# Sistema de Almacén online

Este proyecto es una aplicación web para la compra online de productos de almacén, desarrollada utilizando React para el frontend y Node.js con Express para el backend. La aplicación permite realizar operaciones CRUD (Crear, Leer, Actualizar y Eliminar) sobre órdenes, utilizando MongoDB como base de datos.

## Tecnologías Utilizadas

- **Frontend**: React, React Router, CSS
- **Backend**: Node.js, Express, Express-Session
- **Base de Datos**: MongoDB, Mongoose

## Estructura del Proyecto

- **Frontend**: Código fuente en el directorio `front/`
- **Backend**: Código fuente en el directorio `back/`

## Instalación

### Backend

1. Navega al directorio `back/`.

    cd back

2. Instala las dependencias del backend.

    npm install

3. Configura las variables de entorno. Crea un archivo `.env` en el directorio `back/` y agrega la siguiente línea:

    MONGODB_URI=mongodb://localhost:puerto/mi-base-de-datos

    Asegúrate de reemplazar `mi-base-de-datos` con el nombre de tu base de datos en MongoDB y `puerto` con el puerto configurado.

4. Ejecuta el siguiente comando para obtener una clave única para manejo de sesiones:

    node -e "console.log(require('crypto').randomBytes(64).toString('hex'));"

    y asígnala en la siguiente línea dentro de tu archivo `.env`
    
    SESSION_SECRET=`resultado`

5. Inicia el servidor del backend.

    npm start


### Frontend

1. Navega al directorio `front/`.

    cd frontend

2. Instala las dependencias del frontend.

    npm install

3. Inicia el servidor de desarrollo del frontend.

    npm start

## Funcionalidades

- **Lista de productos (Pantalla principal)**: Visualiza los productos disponibles.
- **Lista de productos por categoría**: Visualiza los productos disponibles por categoría.
- **Lista de productos por novedad**: Visualiza los nuevos productos disponibles.
- **Lista de productos en promoción**: Visualiza los productos disponibles en promoción.
- **Detalles de producto**: Visualiza los detalles del producto seleccionado.
- **Detalles de órdenes**: Consulta los detalles de las órdenes realizadas por el usuario.
- **Carrito de compras**: Gestiona los productos seleccionados.
- **Pantalla de Usuario**: Permite modificar la información de un usuario existente.

## Endpoints del API

- `GET /api/products` - Obtiene todos los productos.
- `GET /api/products/:id` - Obtiene un producto por ID.
- `GET /api/products/category/:category` - Obtiene los productos por categoría.
- `GET /api/orders/:username` - Obtiene el listado de órdenes por usuario.
- `POST /api/orders` - Crea una nueva órden.
- `POST /api/users/register` - Registra un nuevo usuario.
- `POST /api/users/login` - Loguea un usuario.
- `GET /api/users/logout` - Desloguea un usuario.
- `GET /api/users/protected` - Verifica si el usuario está logueado o no.
- `GET /api/users/:id` - Obtiene usuario por ID.
- `PUT /api/users/:id` - Actualiza la información del usuario.
- `GET /api/carts/:id` - Obtiene los datos del carro de compras del usuario logueado.
- `PUT /api/carts/:id` - Guarda los items del carro de compras del usuario logueado.
- `POST /api/mail/sendEmail` - Envía correos con la confirmación de la orden al usuario y admin del sistema.

# Online Convenience Store System
This project is a web application for the online purchase of convenience store products, developed using React for the frontend and Node.js with Express for the backend. The application allows for CRUD (Create, Read, Update, Delete) operations on orders, using MongoDB as the database.

## Technologies Used
- **Frontend**: React, React Router, CSS
- **Backend**: Node.js, Express
- **Database**: MongoDB, Mongoose

## Project Structure
- **Frontend**: Source code in the `front/` directory
- **Backend**: Source code in the `back/` directory

## Installation

### Backend

1. Navigate to the `back/` directory.

   cd back

2. Install the backend dependencies.

   npm install

3. Set up the environment variables. Create a `.env` file in the `back/` directory and add the following line:

   MONGODB_URI=mongodb://localhost:port/my-database

   Make sure to replace `my-database` with the name of your database in MongoDB and `port` with the configured port.

4. Execute the command below to obtain a unique key used in session handling:

    node -e "console.log(require('crypto').randomBytes(64).toString('hex'));"

    and assign it in your `.env` file
    
    SESSION_SECRET=`result`

5. Start the backend server.

   npm start

### Frontend
1. Navigate to the `front/` directory.

   cd frontend

2. Install the frontend dependencies.

   npm install

3. Start the frontend development server.

   npm start

## Features
- **Product List (Main Screen)**: View available products.
- **Product List by Category**: View available products by category.
- **Product List by New Arrivals**: View newly available products.
- **Product List on Promotion**: View products available on promotion.
- **Product Details**: View details of the selected product.
- **Order Details**: View details of orders made by the user.
- **Shopping Cart**: Manage selected products.
- **User Screen**: Allows modification of existing user information.

## API Endpoints
- `GET /api/products` - Retrieves all products.
- `GET /api/products/:id` - Retrieves a product by ID.
- `GET /api/products/category/:category` - Retrieves products by category.
- `GET /api/orders/:username` - Retrieves the list of orders by user.
- `POST /api/orders` - Creates a new order.
- `POST /api/users/register` - Registers a new user.
- `POST /api/users/login` - Logs in a user.
- `GET /api/users/logout` - Logs out a user.
- `GET /api/users/protected` - Verifies if user is logged in or not.
- `GET /api/users/:id` - Gets user by ID.
- `PUT /api/users/:id` - Updates user information.
- `GET /api/carts/:id` - Gets the shopping cart items for the logged in user.
- `PUT /api/carts/:id` - Saves the shopping cart items for the logged in user.
- `POST /api/mail/sendEmail` - Sends emails with order confirmation to both user and system admin.