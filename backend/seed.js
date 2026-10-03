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
    imageUrl: 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=800&q=80',
    ratings: 4.8,
    numReviews: 24
  },
  {
    name: 'Minimalist Modern Chair',
    description: 'A stylish and comfortable addition to any contemporary living room.',
    price: 150.00,
    category: 'Furniture',
    stock: 30,
    imageUrl: 'https://images.unsplash.com/photo-1503602642458-232111445657?auto=format&fit=crop&w=800&q=80',
    ratings: 4.2,
    numReviews: 12
  },
  {
    name: 'Professional DSLR Camera',
    description: 'Capture stunning moments with high-resolution clarity and speed.',
    price: 1199.99,
    category: 'Electronics',
    stock: 8,
    imageUrl: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=800&q=80',
    ratings: 4.9,
    numReviews: 50
  },
  {
    name: 'Classic White Sneakers',
    description: 'Versatile and comfortable, a staple for any casual outfit.',
    price: 85.00,
    category: 'Clothing',
    stock: 50,
    imageUrl: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80',
    ratings: 4.5,
    numReviews: 89
  },
  {
    name: 'Smart Fitness Watch',
    description: 'Track your health, workouts, and notifications in real-time.',
    price: 199.99,
    category: 'Electronics',
    stock: 45,
    imageUrl: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80',
    ratings: 4.7,
    numReviews: 142
  },
  {
    name: 'Vintage Leather Backpack',
    description: 'Durable, stylish, and perfect for your daily commute or travel.',
    price: 120.00,
    category: 'Accessories',
    stock: 25,
    imageUrl: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=800&q=80',
    ratings: 4.6,
    numReviews: 65
  },
  {
    name: 'Organic Cotton T-Shirt',
    description: 'Ultra-soft, breathable, and sustainably sourced cotton t-shirt.',
    price: 25.00,
    category: 'Clothing',
    stock: 150,
    imageUrl: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=800&q=80',
    ratings: 4.4,
    numReviews: 310
  },
  {
    name: 'Stainless Steel Water Bottle',
    description: 'Keep your drinks cold for 24 hours or hot for 12 hours.',
    price: 35.00,
    category: 'Accessories',
    stock: 80,
    imageUrl: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&w=800&q=80',
    ratings: 4.9,
    numReviews: 215
  },
  {
    name: 'Gaming Laptop Pro',
    description: 'High-performance gaming laptop with RTX 4080 and 32GB RAM.',
    price: 1899.99,
    category: 'Electronics',
    stock: 12,
    imageUrl: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=800&q=80',
    ratings: 4.9,
    numReviews: 45
  },
  {
    name: 'Running Shoes X',
    description: 'Lightweight running shoes for all-terrain performance.',
    price: 120.00,
    category: 'Clothing',
    stock: 50,
    imageUrl: 'https://images.unsplash.com/photo-1552346154-21d32810aba3?auto=format&fit=crop&w=800&q=80',
    ratings: 4.7,
    numReviews: 112
  },
  {
    name: 'Luxury Analog Watch',
    description: 'Premium stainless steel watch with automatic movement.',
    price: 350.00,
    category: 'Accessories',
    stock: 25,
    imageUrl: 'https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&w=800&q=80',
    ratings: 4.8,
    numReviews: 67
  },
  {
    name: 'Digital Camera Mirrorless',
    description: '4K video mirrorless camera perfect for vlogging.',
    price: 850.00,
    category: 'Electronics',
    stock: 18,
    imageUrl: 'https://images.unsplash.com/photo-1606986628253-2c7a3b7d2a0e?auto=format&fit=crop&w=800&q=80',
    ratings: 4.6,
    numReviews: 89
  },
  {
    name: 'Comfortable Sofa Cushion',
    description: 'Plush velvet sofa cushion for maximum comfort.',
    price: 45.00,
    category: 'Home',
    stock: 100,
    imageUrl: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=800&q=80',
    ratings: 4.5,
    numReviews: 230
  },
  {
    name: 'Leather Messenger Bag',
    description: 'Handcrafted genuine leather bag for office and casual use.',
    price: 140.00,
    category: 'Accessories',
    stock: 30,
    imageUrl: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=800&q=80',
    ratings: 4.7,
    numReviews: 54
  },
  {
    name: 'Smart Home Speaker',
    description: 'Voice-controlled smart speaker with deep bass.',
    price: 99.99,
    category: 'Electronics',
    stock: 75,
    imageUrl: 'https://images.unsplash.com/photo-1545454675-3531b543be5d?auto=format&fit=crop&w=800&q=80',
    ratings: 4.4,
    numReviews: 320
  },
  {
    name: 'Mountain Bicycle',
    description: '21-speed mountain bike with dual suspension.',
    price: 450.00,
    category: 'Sports',
    stock: 10,
    imageUrl: 'https://images.unsplash.com/photo-1571068316344-75bc76f77890?auto=format&fit=crop&w=800&q=80',
    ratings: 4.9,
    numReviews: 41
  },
  {
    name: 'Gourmet Coffee Beans',
    description: '1lb of freshly roasted Arabica coffee beans.',
    price: 22.00,
    category: 'Food',
    stock: 200,
    imageUrl: 'https://images.unsplash.com/photo-1447933601403-0c6688de566e?auto=format&fit=crop&w=800&q=80',
    ratings: 4.8,
    numReviews: 512
  },
  {
    name: 'Yoga Mat Premium',
    description: 'Non-slip eco-friendly yoga mat with alignment lines.',
    price: 35.00,
    category: 'Sports',
    stock: 85,
    imageUrl: 'https://images.unsplash.com/photo-1592432678016-e910b452f9a2?auto=format&fit=crop&w=800&q=80',
    ratings: 4.6,
    numReviews: 125
  },
  {
    name: 'Wireless Keyboard',
    description: 'Slim mechanical wireless keyboard with backlighting.',
    price: 75.00,
    category: 'Electronics',
    stock: 60,
    imageUrl: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=800&q=80',
    ratings: 4.7,
    numReviews: 95
  },
  {
    name: 'Desk Organizer',
    description: 'Wooden desk organizer for pens, phone, and accessories.',
    price: 28.00,
    category: 'Office',
    stock: 150,
    imageUrl: 'https://images.unsplash.com/photo-1494438639946-1ebd1d20bf85?auto=format&fit=crop&w=800&q=80',
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
