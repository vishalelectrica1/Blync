const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bcrypt = require('bcryptjs');
const User = require('./models/User');
const Product = require('./models/Product');
const connectDB = require('./config/db');

dotenv.config();

connectDB();

const importData = async () => {
  try {
    await User.deleteMany();
    await Product.deleteMany();

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash('password123', salt);
    
    const adminUser = await User.create({
      name: 'Admin User',
      email: 'admin@blync.com',
      password: hashedPassword,
      role: 'admin'
    });

    const products = [
      {
        name: 'Wireless Noise-Cancelling Headphones',
        description: 'Immersive sound experience with advanced active noise cancellation.',
        price: 299.99,
        category: 'Electronics',
        stock: 15,
        imageUrl: 'https://loremflickr.com/800/800/headphones',
        ratings: 4.8,
        numReviews: 24
      },
      {
        name: 'Minimalist Modern Chair',
        description: 'A stylish and comfortable addition to any contemporary living room.',
        price: 150.00,
        category: 'Furniture',
        stock: 30,
        imageUrl: 'https://loremflickr.com/800/800/chair',
        ratings: 4.2,
        numReviews: 12
      },
      {
        name: 'Professional DSLR Camera',
        description: 'Capture stunning moments with high-resolution clarity and speed.',
        price: 1199.99,
        category: 'Electronics',
        stock: 8,
        imageUrl: 'https://loremflickr.com/800/800/dslr',
        ratings: 4.9,
        numReviews: 50
      },
      {
        name: 'Classic White Sneakers',
        description: 'Versatile and comfortable, a staple for any casual outfit.',
        price: 85.00,
        category: 'Clothing',
        stock: 50,
        imageUrl: 'https://loremflickr.com/800/800/sneakers',
        ratings: 4.5,
        numReviews: 89
      },
      {
        name: 'Smart Fitness Watch',
        description: 'Track your health, workouts, and notifications in real-time.',
        price: 199.99,
        category: 'Electronics',
        stock: 45,
        imageUrl: 'https://loremflickr.com/800/800/smartwatch',
        ratings: 4.7,
        numReviews: 142
      },
      {
        name: 'Vintage Leather Backpack',
        description: 'Durable, stylish, and perfect for your daily commute or travel.',
        price: 120.00,
        category: 'Accessories',
        stock: 25,
        imageUrl: 'https://loremflickr.com/800/800/backpack',
        ratings: 4.6,
        numReviews: 65
      },
      {
        name: 'Organic Cotton T-Shirt',
        description: 'Ultra-soft, breathable, and sustainably sourced cotton t-shirt.',
        price: 25.00,
        category: 'Clothing',
        stock: 150,
        imageUrl: 'https://loremflickr.com/800/800/tshirt',
        ratings: 4.4,
        numReviews: 310
      },
      {
        name: 'Stainless Steel Water Bottle',
        description: 'Keep your drinks cold for 24 hours or hot for 12 hours.',
        price: 35.00,
        category: 'Accessories',
        stock: 80,
        imageUrl: 'https://loremflickr.com/800/800/waterbottle',
        ratings: 4.9,
        numReviews: 215
      },
      {
        name: 'Gaming Laptop Pro',
        description: 'High-performance gaming laptop with RTX 4080 and 32GB RAM.',
        price: 1899.99,
        category: 'Electronics',
        stock: 12,
        imageUrl: 'https://loremflickr.com/800/800/laptop',
        ratings: 4.9,
        numReviews: 45
      },
      {
        name: 'Running Shoes X',
        description: 'Lightweight running shoes for all-terrain performance.',
        price: 120.00,
        category: 'Clothing',
        stock: 50,
        imageUrl: 'https://loremflickr.com/800/800/shoes',
        ratings: 4.7,
        numReviews: 112
      },
      {
        name: 'Luxury Analog Watch',
        description: 'Premium stainless steel watch with automatic movement.',
        price: 350.00,
        category: 'Accessories',
        stock: 25,
        imageUrl: 'https://loremflickr.com/800/800/watch',
        ratings: 4.8,
        numReviews: 67
      },
      {
        name: 'Digital Camera Mirrorless',
        description: '4K video mirrorless camera perfect for vlogging.',
        price: 850.00,
        category: 'Electronics',
        stock: 18,
        imageUrl: 'https://loremflickr.com/800/800/camera',
        ratings: 4.6,
        numReviews: 89
      },
      {
        name: 'Comfortable Sofa Cusion',
        description: 'Plush velvet sofa cushion for maximum comfort.',
        price: 45.00,
        category: 'Home',
        stock: 100,
        imageUrl: 'https://loremflickr.com/800/800/sofa',
        ratings: 4.5,
        numReviews: 230
      },
      {
        name: 'Leather Messenger Bag',
        description: 'Handcrafted genuine leather bag for office and casual use.',
        price: 140.00,
        category: 'Accessories',
        stock: 30,
        imageUrl: 'https://loremflickr.com/800/800/bag',
        ratings: 4.7,
        numReviews: 54
      },
      {
        name: 'Smart Home Speaker',
        description: 'Voice-controlled smart speaker with deep bass.',
        price: 99.99,
        category: 'Electronics',
        stock: 75,
        imageUrl: 'https://loremflickr.com/800/800/speaker',
        ratings: 4.4,
        numReviews: 320
      },
      {
        name: 'Mountain Bicycle',
        description: '21-speed mountain bike with dual suspension.',
        price: 450.00,
        category: 'Sports',
        stock: 10,
        imageUrl: 'https://loremflickr.com/800/800/bicycle',
        ratings: 4.9,
        numReviews: 41
      },
      {
        name: 'Gourmet Coffee Beans',
        description: '1lb of freshly roasted Arabica coffee beans.',
        price: 22.00,
        category: 'Food',
        stock: 200,
        imageUrl: 'https://loremflickr.com/800/800/coffee',
        ratings: 4.8,
        numReviews: 512
      },
      {
        name: 'Yoga Mat Premium',
        description: 'Non-slip eco-friendly yoga mat with alignment lines.',
        price: 35.00,
        category: 'Sports',
        stock: 85,
        imageUrl: 'https://loremflickr.com/800/800/yoga',
        ratings: 4.6,
        numReviews: 125
      },
      {
        name: 'Wireless Keyboard',
        description: 'Slim mechanical wireless keyboard with backlighting.',
        price: 75.00,
        category: 'Electronics',
        stock: 60,
        imageUrl: 'https://loremflickr.com/800/800/keyboard',
        ratings: 4.7,
        numReviews: 95
      },
      {
        name: 'Desk Organizer',
        description: 'Wooden desk organizer for pens, phone, and accessories.',
        price: 28.00,
        category: 'Office',
        stock: 150,
        imageUrl: 'https://loremflickr.com/800/800/desk',
        ratings: 4.5,
        numReviews: 210
      }
    ];

    await Product.insertMany(products);
    
    console.log('✅ Data Imported Successfully!');
    process.exit();
  } catch (error) {
    console.error(`❌ Error with data import: ${error.message}`);
    process.exit(1);
  }
};

importData();
