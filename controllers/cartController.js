// =============================================
// controllers/cartController.js
// =============================================

const Cart = require('../models/Cart');
const Product = require('../models/Product');

// @desc    Add product to cart
// @route   POST /api/cart
// @access  Private (JWT required)
const addToCart = async (req, res) => {
  try {
    const { productId, quantity = 1 } = req.body;

    // Validate productId provided
    if (!productId) {
      return res.status(400).json({ success: false, message: 'Product ID is required' });
    }

    // Check if product exists in DB
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }

    // Check stock availability
    if (product.stockQuantity < quantity) {
      return res.status(400).json({ success: false, message: `Only ${product.stockQuantity} items in stock` });
    }

    // Find or create cart for this user
    let cart = await Cart.findOne({ user: req.user._id });

    if (!cart) {
      // Create new cart
      cart = await Cart.create({
        user: req.user._id,
        items: [{ product: productId, quantity }],
      });
    } else {
      // Check if product already in cart
      const itemIndex = cart.items.findIndex(
        (item) => item.product.toString() === productId
      );

      if (itemIndex > -1) {
        // Product exists — update quantity
        cart.items[itemIndex].quantity += quantity;
      } else {
        // Add new item to cart
        cart.items.push({ product: productId, quantity });
      }
      await cart.save();
    }

    // Populate product details before sending response
    await cart.populate('items.product');

    res.status(200).json({
      success: true,
      message: 'Product added to cart',
      data: cart,
    });
  } catch (error) {
    if (error.kind === 'ObjectId') {
      return res.status(400).json({ success: false, message: 'Invalid product ID format' });
    }
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Update product quantity in cart
// @route   PUT /api/cart/:productId
// @access  Private (JWT required)
const updateCartItem = async (req, res) => {
  try {
    const { quantity } = req.body;
    const { productId } = req.params;

    // Validate quantity
    if (!quantity || quantity < 1) {
      return res.status(400).json({ success: false, message: 'Quantity must be at least 1' });
    }

    // Check product exists
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }

    // Check stock
    if (product.stockQuantity < quantity) {
      return res.status(400).json({ success: false, message: `Only ${product.stockQuantity} items in stock` });
    }

    // Find user's cart
    const cart = await Cart.findOne({ user: req.user._id });
    if (!cart) {
      return res.status(404).json({ success: false, message: 'Cart not found' });
    }

    // Find item in cart
    const itemIndex = cart.items.findIndex(
      (item) => item.product.toString() === productId
    );

    if (itemIndex === -1) {
      return res.status(404).json({ success: false, message: 'Product not found in cart' });
    }

    // Update quantity
    cart.items[itemIndex].quantity = quantity;
    await cart.save();
    await cart.populate('items.product');

    res.status(200).json({
      success: true,
      message: 'Cart updated successfully',
      data: cart,
    });
  } catch (error) {
    if (error.kind === 'ObjectId') {
      return res.status(400).json({ success: false, message: 'Invalid product ID format' });
    }
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Remove product from cart
// @route   DELETE /api/cart/:productId
// @access  Private (JWT required)
const removeFromCart = async (req, res) => {
  try {
    const { productId } = req.params;

    // Find user's cart
    const cart = await Cart.findOne({ user: req.user._id });
    if (!cart) {
      return res.status(404).json({ success: false, message: 'Cart not found' });
    }

    // Filter out the item
    const initialLength = cart.items.length;
    cart.items = cart.items.filter(
      (item) => item.product.toString() !== productId
    );

    if (cart.items.length === initialLength) {
      return res.status(404).json({ success: false, message: 'Product not found in cart' });
    }

    await cart.save();
    await cart.populate('items.product');

    res.status(200).json({
      success: true,
      message: 'Product removed from cart',
      data: cart,
    });
  } catch (error) {
    if (error.kind === 'ObjectId') {
      return res.status(400).json({ success: false, message: 'Invalid product ID format' });
    }
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get user's cart
// @route   GET /api/cart
// @access  Private (JWT required)
const getCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user._id }).populate('items.product');

    if (!cart) {
      return res.status(200).json({ success: true, data: { items: [] } });
    }

    res.status(200).json({ success: true, data: cart });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { addToCart, updateCartItem, removeFromCart, getCart };
