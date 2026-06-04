// =============================================
// routes/productRoutes.js
// =============================================

const express = require('express');
const router = express.Router();
const { getAllProducts, getProductById } = require('../controllers/productController');

// GET /api/products        → Fetch all products
router.get('/', getAllProducts);

// GET /api/products/:id    → Fetch single product
router.get('/:id', getProductById);

module.exports = router;
