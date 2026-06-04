# ShoppyGlobe Backend API

Backend for ShoppyGlobe E-commerce built with **Node.js**, **Express.js**, **MongoDB**, and **JWT Authentication**.

---

## 🚀 Setup & Installation

```bash
# 1. Navigate to backend folder
cd shoppyglobe-backend

# 2. Install dependencies
npm install

# 3. Start MongoDB (make sure MongoDB is running locally)
# Windows: net start MongoDB
# Mac/Linux: sudo systemctl start mongod

# 4. Seed sample products
node seed.js

# 5. Start development server
npm run dev
```

Server runs at: `http://localhost:5000`

---

## 📁 Folder Structure

```
shoppyglobe-backend/
├── config/
│   └── db.js               # MongoDB connection
├── controllers/
│   ├── authController.js   # Register & Login logic
│   ├── cartController.js   # Cart CRUD logic
│   └── productController.js# Product fetch logic
├── middleware/
│   └── authMiddleware.js   # JWT protect middleware
├── models/
│   ├── Cart.js             # Cart schema
│   ├── Product.js          # Product schema
│   └── User.js             # User schema
├── routes/
│   ├── authRoutes.js       # /api/auth
│   ├── cartRoutes.js       # /api/cart
│   └── productRoutes.js    # /api/products
├── .env                    # Environment variables
├── seed.js                 # DB seeder
└── server.js               # Entry point
```

---

## 🔗 API Endpoints

### Auth Routes (Public)
| Method | Endpoint            | Description          |
|--------|---------------------|----------------------|
| POST   | /api/auth/register  | Register new user    |
| POST   | /api/auth/login     | Login & get JWT      |

### Product Routes (Public)
| Method | Endpoint              | Description              |
|--------|-----------------------|--------------------------|
| GET    | /api/products         | Get all products         |
| GET    | /api/products/:id     | Get product by ID        |

### Cart Routes (🔒 JWT Required)
| Method | Endpoint              | Description              |
|--------|-----------------------|--------------------------|
| GET    | /api/cart             | Get user's cart          |
| POST   | /api/cart             | Add item to cart         |
| PUT    | /api/cart/:productId  | Update item quantity     |
| DELETE | /api/cart/:productId  | Remove item from cart    |

---

## 🧪 ThunderClient Testing Guide

### 1. Register User
- **Method:** POST  
- **URL:** `http://localhost:5000/api/auth/register`  
- **Body (JSON):**
```json
{
  "name": "Jai Surya",
  "email": "jai@test.com",
  "password": "123456"
}
```

### 2. Login User
- **Method:** POST  
- **URL:** `http://localhost:5000/api/auth/login`  
- **Body (JSON):**
```json
{
  "email": "jai@test.com",
  "password": "123456"
}
```
✅ Copy the `token` from the response for protected routes.

### 3. Get All Products
- **Method:** GET  
- **URL:** `http://localhost:5000/api/products`

### 4. Get Product by ID
- **Method:** GET  
- **URL:** `http://localhost:5000/api/products/<product_id>`

### 5. Add to Cart (🔒 Auth Required)
- **Method:** POST  
- **URL:** `http://localhost:5000/api/cart`  
- **Headers:** `Authorization: Bearer <your_token>`  
- **Body (JSON):**
```json
{
  "productId": "<product_id>",
  "quantity": 2
}
```

### 6. Update Cart Item (🔒 Auth Required)
- **Method:** PUT  
- **URL:** `http://localhost:5000/api/cart/<product_id>`  
- **Headers:** `Authorization: Bearer <your_token>`  
- **Body (JSON):**
```json
{
  "quantity": 5
}
```

### 7. Remove from Cart (🔒 Auth Required)
- **Method:** DELETE  
- **URL:** `http://localhost:5000/api/cart/<product_id>`  
- **Headers:** `Authorization: Bearer <your_token>`

---

## 🔒 Authentication

Uses **JWT (JSON Web Token)**.  
- Token expires in **7 days**
- Send token in header: `Authorization: Bearer <token>`
- Cart routes return `401 Unauthorized` without a valid token

---

## ⚙️ Environment Variables (.env)

```
PORT=5000
MONGO_URI=mongodb://localhost:27017/shoppyglobe
JWT_SECRET=shoppyglobe_super_secret_key_2024
```
