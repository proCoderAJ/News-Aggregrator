
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

const newsRoutes = require('./routes/news');

dotenv.config();

const app = express();

// Debug: Log environment on startup
console.log('🔍 Environment Check:');
console.log('✓ MONGODB_URI configured:', !!process.env.MONGODB_URI);
console.log('✓ NEWS_API_KEY configured:', !!process.env.NEWS_API_KEY);
console.log('✓ PORT configured:', process.env.PORT || '5000');

// CORS configuration for Vercel deployment
const corsOptions = {
  origin: [
    'http://localhost:3000',
    'http://localhost:5000',
    'https://news-aggregrator-frontend-aao53nqe7-procoderajs-projects.vercel.app',
    process.env.FRONTEND_URL || 'http://localhost:3000'
  ],
  credentials: true,
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type']
};

app.use(cors(corsOptions));
app.use(express.json()); 

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    mongodb: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected',
    timestamp: new Date().toISOString()
  });
});

// MongoDB connection with better error handling
const connectMongoDB = async () => {
  try {
    if (!process.env.MONGODB_URI) {
      throw new Error('MONGODB_URI is not defined in environment variables');
    }
    
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 10000,
      socketTimeoutMS: 45000,
    });
    console.log('✅ MongoDB connected successfully');
  } catch (err) {
    console.error('❌ MongoDB connection error:', err.message);
    console.error('Full error:', err);
    // Don't exit immediately, allow API to work with cached data
    setTimeout(connectMongoDB, 5000); // Retry after 5 seconds
  }
};

connectMongoDB();

app.use('/api/news', newsRoutes);

app.get('/', (req, res) => {
  res.json({
    message: 'News Aggregator API',
    status: 'running',
    mongodb: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected',
    endpoints: {
      'GET /': 'API status and info',
      'GET /health': 'Health check',
      'GET /api/news': 'Get all cached articles',
      'GET /api/news/fetch': 'Fetch fresh articles from NewsAPI',
      'GET /api/news/search?keyword=term': 'Search articles by keyword',
      'GET /api/news/category/:category': 'Get articles by category'
    }
  });
});

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found'
  });
});

app.use((err, req, res, next) => {
  console.error('Server error:', err);
  res.status(500).json({
    success: false,
    message: 'Internal server error',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📡 API available at http://localhost:${PORT}`);
  console.log(`📰 Test endpoint: http://localhost:${PORT}/api/news`);
  console.log(`💪 Health check: http://localhost:${PORT}/health`);
});
