
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

const newsRoutes = require('./routes/news');

dotenv.config();

const app = express();

// Debug: Log environment on startup
console.log('🔍 Environment Check:');
console.log('✓ MONGODB_URI defined:', !!process.env.MONGODB_URI);
console.log('✓ NEWS_API_KEY defined:', !!process.env.NEWS_API_KEY);
console.log('✓ PORT:', process.env.PORT || '5000');

// CORS configuration for Vercel deployment
const corsOptions = {
  origin: [
    'http://localhost:3000',
    'http://localhost:5000',
    'https://news-aggregrator-frontend-65ghfgwdw-procoderajs-projects.vercel.app',
    'https://news-aggregrator-frontend-aao53nqe7-procoderajs-projects.vercel.app',
    process.env.FRONTEND_URL || 'http://localhost:3000'
  ],
  credentials: true,
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type']
};

app.use(cors(corsOptions));
app.use(express.json()); 

// Global connection state
let mongodbConnected = false;

// Health check endpoint - always works
app.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    mongodb: mongodbConnected ? 'connected' : 'disconnected',
    timestamp: new Date().toISOString()
  });
});

// MongoDB connection - non-blocking
const connectMongoDB = async () => {
  if (mongodbConnected) return;
  
  try {
    if (!process.env.MONGODB_URI) {
      console.warn('⚠️  MONGODB_URI is not configured');
      return;
    }
    
    console.log('🔗 Connecting to MongoDB...');
    
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    });
    
    mongodbConnected = true;
    console.log('✅ MongoDB connected successfully');
  } catch (err) {
    mongodbConnected = false;
    console.warn('⚠️  MongoDB connection failed:', err.message);
    // Don't exit, allow API to work without database
    // Retry after 10 seconds
    setTimeout(connectMongoDB, 10000);
  }
};

// Connect to MongoDB but don't wait for it
connectMongoDB();

app.use('/api/news', newsRoutes);

app.get('/', (req, res) => {
  res.json({
    message: 'News Aggregator API ✅',
    status: 'running',
    mongodb: mongodbConnected ? 'connected' : 'connecting...',
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

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found',
    path: req.path
  });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error('❌ Server error:', err);
  res.status(500).json({
    success: false,
    message: 'Internal server error',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

const PORT = process.env.PORT || 5000;

// Start server
try {
  app.listen(PORT, () => {
    console.log(`\n🚀 News Aggregator API started`);
    console.log(`📡 Server running on port ${PORT}`);
    console.log(`🔗 Root: http://localhost:${PORT}`);
    console.log(`💪 Health: http://localhost:${PORT}/health`);
    console.log(`📰 News: http://localhost:${PORT}/api/news\n`);
  });
} catch (err) {
  console.error('❌ Failed to start server:', err);
  process.exit(1);
}
