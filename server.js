// =============================================
// server.js - ShoppyGlobe Backend Entry Point
// =============================================

const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();

// ---- Middleware ----
app.use(cors());                        // Allow cross-origin requests (React frontend)
app.use(express.json());                // Parse JSON request bodies

// ---- Routes ----
app.use('/api/products', require('./routes/productRoutes'));
app.use('/api/cart',     require('./routes/cartRoutes'));
app.use('/api/auth',     require('./routes/authRoutes'));

// ---- Root Route ----
app.get('/', (req, res) => {
  res.json({ message: 'ShoppyGlobe API is running 🚀' });
});

// ---- Global Error Handler ----
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ success: false, message: 'Internal Server Error' });
});

// ---- Start Server ----
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
