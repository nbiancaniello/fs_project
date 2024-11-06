*** ENGLISH FOLLOWS NEXT ***

# Sistema de Almacén online

Este proyecto es una aplicación web para la compra online de productos de almacé, desarrollada utilizando React para el frontend y Node.js con Express para el backend. La aplicación permite realizar operaciones CRUD (Crear, Leer, Actualizar y Eliminar) sobre órdenes, utilizando MongoDB como base de datos.

## Tecnologías Utilizadas

- **Frontend**: React, React Router, CSS
- **Backend**: Node.js, Express
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

4. Inicia el servidor del backend.

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

4. Start the backend server.

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