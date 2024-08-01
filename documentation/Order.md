# Order

**Base URL:** `http://localhost:3000/api/v1/orders`

**IMPORTANT:**

- An authorization token is required for accessing `POST` and `DELETE` methods for this endpoint. Refer to `User` endpoint for accessing protected routes through a JWT token.
- `POST` methods use JSON body data.

### Get All Orders

- **URL:** `/`
    
- **Method:** `GET`
    
- **Description:** Get a list of all orders.
    
- **Response:**
    - `200 OK:`
        ```json
        {
            "count": "Number of orders",
            "orders": [
                {
                    "_id": String,
                    "product": {
                        "_id": String,
                        "name": String,
                        "price": Number,
                        "stock": Number,
                        "productImage": String
                    },
                    "quantity": Number,
                    "request": {
                        "type": "GET",
                        "description": "Get all orders",
                        "url": String
                    }
                }
            ]
        }
        ```
    
    - `500 Internal Server Error:`
        ```json
        {
            "message": "Error message"
        }
        ```

### Get Single Order

- **URL:** `/:id`
    
- **Method:** `GET`
    
- **Description:** Retrieve a single order by its ID.
    
- **Response:**
        
    - `200 OK:`
        ```json
        {
            "_id": String,
            "product": {
                "_id": String,
                "name": String,
                "price": Number,
                "stock": Number,
                "productImage": String
            },
            "quantity": Number,
            "request": {
                "type": "GET",
                "description": "Get a single order by ID",
                "url": String
            }
        }
        ```

    - `404 Not Found:`
        ```json
        {
            "message": "Order not found"
        }
        ```
    
    - `500 Internal Server Error:`
        ```json
        {
            "message": "Error message"
        }
        ```

### Create Order

- **URL:** `/`
    
- **Method:** `POST`
    
- **Description:** Create a new order.
    
- **Request:**
    
    - **Body:**
        ```json
        {
            "product": String,
            "quantity": Number
        }
        ```

- **Response:**

    - `201 Created:`
        ```json
        {
            "message": "Order Placed!",
            "placedOrder": {
                "_id": String,
                "product": {
                    "_id": String,
                    "name": String,
                    "price": Number,
                    "stock": Number,
                    "productImage": String
                },
                "quantity": Number
            },
            "request": {
                "type": "GET",
                "url": String
            }
        }
        ```
    
    - `404 Not Found:`
        ```json
        {
            "message": "Product not found"
        }
        ```
    
    - `500 Internal Server Error:`
        ```json
        {
            "message": "Error message"
        }
        ```

### Delete Order

- **URL:** `/:id`
    
- **Method:** `DELETE`
    
- **Description:** Delete an existing order by its ID.
    
- **Response:**

    - `200 OK:`
        ```json
        {
            "message": "Order deleted",
            "deletedOrder": {
                "_id": String,
                "product": {
                    "_id": String,
                    "name": String,
                    "price": Number,
                    "stock": Number,
                    "productImage": String
                },
                "quantity": Number,
                "request": {
                    "method": "POST",
                    "url": String,
                    "body": {
                        "product": "String",
                        "quantity": "Number"
                    }
                }
            }
        }
        ```
    
    - `404 Not Found:`
        ```json
        {
            "message": "Order not found"
        }
        ```
        
    - `500 Internal Server Error:`
        ```json
        {
            "message": "Error message"
        }
        ```

#### Example Responses

##### Get All Orders:

```json
{
    "count": 2,
    "orders": [
        {
            "_id": "60c72b2f9b1d8c1a30f6e3b1",
            "product": {
                "_id": "60c72b2f9b1d8c1a30f6e3b1",
                "name": "Product 1",
                "price": 29.99,
                "stock": 100,
                "productImage": "uploads/product1.jpg"
            },
            "quantity": 2,
            "request": {
                "type": "GET",
                "description": "Get all orders",
                "url": "http://localhost:3000/api/v1/orders/60c72b2f9b1d8c1a30f6e3b1"
            }
        },
        //more orders
    ]
}
```
##### Get Single Order:

``` json
{
    "_id": "60c72b2f9b1d8c1a30f6e3b1",
    "product": {
        "_id": "60c72b2f9b1d8c1a30f6e3b1",
        "name": "Product 1",
        "price": 29.99,
        "stock": 100,
        "productImage": "uploads/product1.jpg"
    },
    "quantity": 2,
    "request": {
        "type": "GET",
        "description": "Get a single order by ID",
        "url": "http://localhost:3000/api/v1/orders/60c72b2f9b1d8c1a30f6e3b1"
    }
}
```

##### Create Order

``` json
{
    "message": "Order Placed!",
    "placedOrder": {
        "_id": "60c72b2f9b1d8c1a30f6e3b3",
        "product": {
            "_id": "60c72b2f9b1d8c1a30f6e3b3",
            "name": "Product 3",
            "price": 49.99,
            "stock": 30,
            "productImage": "uploads/product3.jpg"
        },
        "quantity": 3
    },
    "request": {
        "type": "GET",
        "url": "http://localhost:3000/api/v1/orders/60c72b2f9b1d8c1a30f6e3b3"
    }
}
```
##### Delete Order:

``` json
{
    "message": "Order deleted",
    "deletedOrder": {
        "_id": "60c72b2f9b1d8c1a30f6e3b1",
        "product": {
            "_id": "60c72b2f9b1d8c1a30f6e3b1",
            "name": "Product 1",
            "price": 29.99,
            "stock": 100,
            "productImage": "uploads/product1.jpg"
        },
        "quantity": 2,
        "request": {
            "method": "POST",
            "url": "http://localhost:3000/api/v1/orders",
            "body": {
                "product": "String",
                "quantity": "Number"
            }
        }
    }
}
```