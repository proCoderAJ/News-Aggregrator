
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

const newsRoutes = require('./routes/news');

dotenv.config();

const app = express();

app.use(cors()); 
app.use(express.json()); 

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
  console.log('✅ MongoDB connected successfully');
})
.catch((err) => {
  console.error('❌ MongoDB connection error:', err.message);
  process.exit(1); 
});

app.use('/api/news', newsRoutes);

app.get('/', (req, res) => {
  res.json({
    message: 'News Aggregator API',
    status: 'running',
    endpoints: {
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
});
