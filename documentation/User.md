# User

**Base URL:** `http://localhost:3000/api/v1/user`

**IMPORTANT:**

- An authorization token is required for accessing `DELETE` methods for this endpoint. 
- Passwords are saved in the database after they have been hashed using `bcrypt.hash`.

### Signup

- **URL:** `/signup`
    
- **Method:** `POST`
    
- **Description:** Create a new user.
    
- **Request:**
    
    - **Body:**
        ```json
        {
            "email": String,
            "password": String
        }
        ```

- **Response:**

    - `201 Created:`
        ```json
        {
            "message": "User Created!"
        }
        ```
    
    - `409 Conflict:`
        ```json
        {
            "message": "Email already exists"
        }
        ```
    
    - `500 Internal Server Error:`
        ```json
        {
            "error": "Error message"
        }
        ```

### Login

- **URL:** `/login`
    
- **Method:** `POST`
    
- **Description:** Login an existing user.
    
- **Request:**
    
    - **Body:**
        ```json
        {
            "email": String,
            "password": String
        }
        ```

- **Response:**

    - `200 OK:`
        ```json
        {
            "message": "Authorization Success",
            "token": "JWT token"
        }
        ```
    
    - `401 Unauthorized:`
        ```json
        {
            "message": "Authorization Failed"
        }
        ```
    
    - `500 Internal Server Error:`
        ```json
        {
            "error": "Error message"
        }
        ```

### Delete User

- **URL:** `/:id`
    
- **Method:** `DELETE`
    
- **Description:** Delete an existing user by their ID. Requires authentication.
    
- **Response:**

    - `200 OK:`
        ```json
        {
            "message": "User deleted"
        }
        ```
    
    - `404 Not Found:`
        ```json
        {
            "message": "User not found"
        }
        ```
        
    - `500 Internal Server Error:`
        ```json
        {
            "error": "Error message"
        }
        ```

#### Example Requests and Responses

##### Signup:

**Request:**
```json
{
    "email": "user@example.com",
    "password": "password123"
}
```

**Response:**
``` json
{
    "message": "User Created!"
}
```

##### Login:

**Request:**
```json
{
    "email": "user@example.com",
    "password": "password123"
}
```
**Response:**
``` json
{
    "message": "Authorization Success",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

##### Delete:

**Request:**

DELETE /api/v1/user/60c72b2f9b1d8c1a30f6e3b1
Authorization: Bearer `<JWT token>`

**Response:**
``` json
{
    "message": "User deleted"
}
```