const mongoose = require('mongoose');

const articleSchema = new mongoose.Schema({
 
  articleId: {
    type: String,
    required: true,
    unique: true
  },

  title: {
    type: String,
    required: true
  },

  description: {
    type: String
  },

  content: {
    type: String
  },
 
  source: {
    type: String,
    required: true
  },

  author: {
    type: String
  },
 
  url: {
    type: String,
    required: true
  },

  urlToImage: {
    type: String
  },
 
  publishedAt: {
    type: Date,
    required: true
  },
 
  category: {
    type: String,
    default: 'general'
  },

  cachedAt: {
    type: Date,
    default: Date.now
  }
});


articleSchema.index({ title: 'text', description: 'text', content: 'text' });
articleSchema.index({ category: 1 });
articleSchema.index({ publishedAt: -1 });


module.exports = mongoose.model('Article', articleSchema);
