// =============================================
// seed.js - Seed Sample Products into MongoDB
// Run: node seed.js
// =============================================

const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Product = require('./models/Product');

dotenv.config();

const sampleProducts = [
  {
    name: 'iPhone 15 Pro',
    price: 134900,
    description: 'Apple iPhone 15 Pro with A17 Pro chip, 48MP camera system, and titanium design.',
    stockQuantity: 25,
    category: 'Electronics',
    image: 'https://via.placeholder.com/300x300?text=iPhone+15+Pro',
  },
  {
    name: 'Samsung Galaxy S24',
    price: 79999,
    description: 'Samsung Galaxy S24 with Snapdragon 8 Gen 3, 50MP camera, and AI features.',
    stockQuantity: 30,
    category: 'Electronics',
    image: 'https://via.placeholder.com/300x300?text=Galaxy+S24',
  },
  {
    name: 'Sony WH-1000XM5',
    price: 29990,
    description: 'Industry-leading noise cancelling wireless headphones with 30hr battery life.',
    stockQuantity: 50,
    category: 'Audio',
    image: 'https://via.placeholder.com/300x300?text=Sony+WH1000XM5',
  },
  {
    name: 'MacBook Air M3',
    price: 114900,
    description: 'MacBook Air with M3 chip, 15-inch Liquid Retina display, and 18hr battery.',
    stockQuantity: 15,
    category: 'Laptops',
    image: 'https://via.placeholder.com/300x300?text=MacBook+Air+M3',
  },
  {
    name: 'Nike Air Max 270',
    price: 10995,
    description: 'Iconic Nike Air Max 270 sneakers with Max Air heel unit for all-day comfort.',
    stockQuantity: 100,
    category: 'Footwear',
    image: 'https://via.placeholder.com/300x300?text=Nike+Air+Max',
  },
  {
    name: 'Logitech MX Master 3S',
    price: 9995,
    description: 'Advanced wireless mouse with ultra-fast MagSpeed scroll and ergonomic design.',
    stockQuantity: 40,
    category: 'Accessories',
    image: 'https://via.placeholder.com/300x300?text=MX+Master+3S',
  },
];

const seedDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ MongoDB Connected');

    // Clear existing products
    await Product.deleteMany({});
    console.log('🗑️  Cleared existing products');

    // Insert sample products
    await Product.insertMany(sampleProducts);
    console.log(`✅ ${sampleProducts.length} products seeded successfully!`);

    process.exit(0);
  } catch (error) {
    console.error('❌ Seeding failed:', error.message);
    process.exit(1);
  }
};

seedDB();
