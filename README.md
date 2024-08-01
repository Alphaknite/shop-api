# Overview

## This is a basic e-commerce API built using Node.js, Express, and MongoDB. It allows for the management of products, orders, and users. The API includes `CRUD` operations and uses `JWT` for authentication.

# Getting Started
### Prerequisites
- Node.js
- npm
- MongoDB (I used Atlas for this project).

## Create a .env file with the following variables
```
MONGODB_URI=your_mongodb_connection_string
JWT_KEY=your_jwt_secret_key
BASE_URL=http://localhost:3000
PORT=3000
```
The server will run on `http://localhost:3000`.

# API Endpoints
### Products

`GET` /api/v1/products - **get all products**

`Get` /api/v1/products/:id - **get a single product by ID**

`POST` /api/v1/products - **create a new product**

`PUT` /api/v1/products/:id - **update a product by ID**

`DELETE` /api/v1/products/:id - **delete a product by ID**

### Orders

`GET` /api/v1/orders - **Get all orders**

`Get` /api/v1/orders/:id - **a single order by ID**

`POST` /api/v1/orders - **Create a new order**

`DELETE` /api/v1/orders/:id - **Delete an order by ID**

### Users

`POST` /api/v1/user/signup - **user signup**

`POST` /api/v1/user/login - **user login**

`DELETE` /api/v1/user/:id - **delete a user by id**

## Middleware

-   **check-auth.js** - Middleware for checking JWT authentication

## Models

-   **Product** - Schema for products
-   **Order** - Schema for orders
-   **User** - Schema for users
