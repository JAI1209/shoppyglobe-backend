// =============================================
// routes/cartRoutes.js - All routes JWT protected
// =============================================

const express = require('express');
const router = express.Router();
const { addToCart, updateCartItem, removeFromCart, getCart } = require('../controllers/cartController');
const { protect } = require('../middleware/authMiddleware');

// All cart routes are protected — user must be logged in

// GET    /api/cart              → Get user's cart
router.get('/', protect, getCart);

// POST   /api/cart              → Add item to cart
router.post('/', protect, addToCart);

// PUT    /api/cart/:productId   → Update item quantity
router.put('/:productId', protect, updateCartItem);

// DELETE /api/cart/:productId  → Remove item from cart
router.delete('/:productId', protect, removeFromCart);

module.exports = router;
