# Product

**Base URL:** `http://localhost:3000/api/v1/products`

**IMPORTANT:**

- An authorization token is required for accessing `POST`, `PUT`, and `DELETE` methods for this endpoint. Refer to `User` endpoint for accessing protected routes through a JWT token.
- `POST` and `PUT` methods use form-data.
- You may use `raw body data(JSON)` if not changing the image for `PUT` mehtod.
    

### Get All Products

- **URL:** `/`
    
- **Method:** `GET`
    
- **Description:** Get a list of all products.
    
- **Response:**
    - `200 OK:`
        ``` json
        {
            "count": "Number of products",
            "products": [
                "_id": String,
                "name": String,
                "price": Number,
                "stock": Number,
                "productImage": String,
                "request": {
                    "type": "GET",
                    "description": "Get all products",
                    "url": String,
                },
            ]
        }
        ```
    
    - `500 Internal Server Error:`
        ``` json
        {
            "message": "Error message"
        }
        ```

### Get Single Product

- **URL:** `/:id`
    
- **Method:** `GET`
    
- **Description:** Retrieve a single product by its ID.
    
- **Response:**
        
    - `200 OK:`
        ``` json
        {
            "_id": String,
            "name": String,
            "price": Number,
            "stock": Number,
            "productImage": String,
            "request": {
                "type": "GET",
                "description": "Get a single product by ID",
                "url": String,
            }
        }
        ```

    - `404 Not Found:`
        ``` json
        {
            "message": "Product not found"
        }
        ```
    
    - `500 Internal Server Error:`
        ``` json
        {
            "message": "Error message"
        }
        ```
        


### Create Product

- **URL:** `/`
    
- **Method:** `POST`
    
- **Description:** Create a new product.
    
- **Request:**
    
    - **Body:**
        ``` json
        {
            "name": String,
            "price": Number,
            "stock": Number,
            "productImage": FILE,
        }
        ```

- **Response:**

    - `201 Created:`
        ``` json
        {
            "message": "Product created!",
            "createdProduct": {
                "_id": String,
                "name": String,
                "price": Number,
                "stock": Number,
                "productImage": String,
                "request": {
                    "type": "GET",
                    "url": String,
                }
            }
        }
        ```
    
    - `500 Internal Server Error:`
        ``` json
        {
            "message": "Error message"
        }
        ```
    

### Update Product

- **URL:** `:/id`
    
- **Method:** `PUT`
    
- **Description:** Update an exisiting product by its ID.
    
- Request: (Not all fields are required)
    
    - **Body:**
        ``` json
        {
            "name": String,
            "price": Number,
            "stock": Number,
            "productImage": FILE,
        }

        ```

- **Response:**

        
    - `200 OK:`
        ``` json
        {
            "message": "Product Updated",
            "product": {
                "_id": String,
                "name": String,
                "price": Number,
                "stock": Number,
                "productImage": String,
                "request": {
                    "type": "GET",
                    "url": String,
                }
            }
        }
        ```
    
    - `400 Bad Request:`
        ``` json
        {
            "message": "Invalid ID"
        }
        ```
        
    - `404 Not Found:`
        ``` json
        {
            "message": "Product not found"
        }
        ```
        
    - `500 Internal Server Error:`
        ``` json
        {
            "message": "Error message"
        }
        ```


### Delete Product

- **URL:** `/:id`
    
- **Method:** `DELETE`
    
- **Description:** Delete an exisiting product by its ID.
    
- **Response:**

    - `200 OK:`
        ``` json
        {
            "message": "Product deleted",
            "deletedProduct": {
                "_id": String,
                "name": String,
                "price": Number,
                "stock": Number,
                "productImage": String,
                "request": {
                    "type": "POST",
                    "url": String,
                    "body": {
                            "name": "String",
                            "price": "Number",
                            "stock": "Number",
                            "productImage": "File"
                    }
                }
            }
        }
        ```
    
    - `404 Not Found:`
        ``` json
        {
            "message": "Product not found"
        }
        ```
        
    - `500 Internal Server Error:`
        ``` json
        {
            "message": "Error message"
        }
        ```


### Example Responses

#### Get All Products:

``` json
{
    "count": 2,
    "products": [
        {
            "_id": "60c72b2f9b1d8c1a30f6e3b1",
            "name": "Product 1",
            "price": 29.99,
            "stock": 100,
            "productImage": "uploads/product1.jpg",
            "request": {
                "type": "GET",
                "description": "Get all products",
                "url": "http://localhost:3000/products/60c72b2f9b1d8c1a30f6e3b1"
            }
        },
        {
            "_id": "60c72b2f9b1d8c1a30f6e3b2",
            "name": "Product 2",
            "price": 39.99,
            "stock": 50,
            "productImage": "uploads/product2.jpg",
            "request": {
                "type": "GET",
                "description": "Get all products",
                "url": "http://localhost:3000/products/60c72b2f9b1d8c1a30f6e3b2"
            }
        }
    ]
}
```

#### Get Single Product:

``` json
{
    "_id": "60c72b2f9b1d8c1a30f6e3b1",
    "name": "Product 1",
    "price": 29.99,
    "stock": 100,
    "productImage": "uploads/product1.jpg",
    "request": {
        "type": "GET",
        "description": "Get a single product by ID",
        "url": "http://localhost:3000/products/60c72b2f9b1d8c1a30f6e3b1"
    }
}
```

#### Create Product:

``` json
{
    "message": "Product created!",
    "createdProduct": {
        "_id": "60c72b2f9b1d8c1a30f6e3b3",
        "name": "Product 3",
        "price": 49.99,
        "stock": 30,
        "productImage": "uploads/product3.jpg",
        "request": {
            "type": "GET",
            "url": "http://localhost:3000/products/60c72b2f9b1d8c1a30f6e3b3"
        }
    }
}
```

#### Update Product:

``` json
{
    "message": "Product Updated",
    "product": {
        "_id": "60c72b2f9b1d8c1a30f6e3b1",
        "name": "Updated Product",
        "price": 35.99,
        "stock": 90,
        "productImage": "uploads/updated_product.jpg"
    },
    "request": {
        "type": "GET",
        "url": "http://localhost:3000/products/60c72b2f9b1d8c1a30f6e3b1"
    }
}
```

#### Delete Product:

``` json
{
    "message": "Product deleted",
    "deletedProduct": {
        "_id": "60c72b2f9b1d8c1a30f6e3b1",
        "name": "Product 1",
        "price": 29.99,
        "stock": 100,
        "productImage": "uploads/product1.jpg",
        "request": {
            "type": "POST",
            "url": "http://localhost:3000/products",
            "body": {
                "name": "String",
                "price": "Number",
                "stock": "Number",
                "productImage": "File"
            }
        }
    }
}
```
