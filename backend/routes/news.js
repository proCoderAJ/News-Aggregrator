

const express = require('express');
const router = express.Router();
const axios = require('axios');
const Article = require('../models/Article');

function createArticleId(article) {
  return `${article.source.name}-${article.publishedAt}-${article.title.substring(0, 20)}`.replace(/\s/g, '-');
}

router.get('/', async (req, res) => {
  try {
   
    const articles = await Article.find()
      .sort({ publishedAt: -1 })
      .limit(50); 
    
    res.json({
      success: true,
      count: articles.length,
      data: articles
    });
  } catch (error) {
    console.error('Error fetching articles:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch articles from database'
    });
  }
});

router.get('/fetch', async (req, res) => {
  try {
    const { category = 'general', country = 'us' } = req.query;
    
    const response = await axios.get('https://newsapi.org/v2/top-headlines', {
      params: {
        country: country,
        category: category,
        apiKey: process.env.NEWS_API_KEY,
        pageSize: 20
      }
    });

    if (response.data.status !== 'ok') {
      throw new Error('NewsAPI returned an error');
    }

    const articles = response.data.articles;
    const savedArticles = [];

    for (const article of articles) {
      try {
        const articleId = createArticleId(article);
        
        const existingArticle = await Article.findOne({ articleId });
        
        if (!existingArticle) {
          const newArticle = new Article({
            articleId,
            title: article.title,
            description: article.description,
            content: article.content,
            source: article.source.name,
            author: article.author,
            url: article.url,
            urlToImage: article.urlToImage,
            publishedAt: article.publishedAt,
            category: category
          });
          
          await newArticle.save();
          savedArticles.push(newArticle);
        } else {
          savedArticles.push(existingArticle);
        }
      } catch (err) {
        console.error('Error saving article:', err.message);
  
      }
    }

    res.json({
      success: true,
      message: `Fetched ${articles.length} articles, saved ${savedArticles.length} new articles`,
      count: savedArticles.length,
      data: savedArticles
    });

  } catch (error) {
    console.error('Error fetching from NewsAPI:', error.message);
    
    try {
      const { category = 'general' } = req.query;
      const cachedArticles = await Article.find(
        category !== 'general' ? { category } : {}
      )
        .sort({ publishedAt: -1 })
        .limit(50);
      
      res.json({
        success: true,
        message: 'NewsAPI unavailable. Showing cached articles instead.',
        count: cachedArticles.length,
        data: cachedArticles
      });
    } catch (fallbackError) {
      res.status(500).json({
        success: false,
        message: 'Failed to fetch articles from NewsAPI and no cached articles available',
        error: error.message
      });
    }
  }
});

router.get('/search', async (req, res) => {
  try {
    const { keyword } = req.query;
    
    if (!keyword) {
      return res.status(400).json({
        success: false,
        message: 'Please provide a keyword to search'
      });
    }

    const articles = await Article.find({
      $or: [
        { title: { $regex: keyword, $options: 'i' } },
        { description: { $regex: keyword, $options: 'i' } },
        { content: { $regex: keyword, $options: 'i' } }
      ]
    }).sort({ publishedAt: -1 }).limit(50);

    res.json({
      success: true,
      count: articles.length,
      data: articles
    });

  } catch (error) {
    console.error('Error searching articles:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to search articles'
    });
  }
});

router.get('/category/:category', async (req, res) => {
  try {
    const { category } = req.params;
    
    const articles = await Article.find({ category })
      .sort({ publishedAt: -1 })
      .limit(50);

    res.json({
      success: true,
      count: articles.length,
      category: category,
      data: articles
    });

  } catch (error) {
    console.error('Error fetching by category:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch articles by category'
    });
  }
});


router.delete('/clear', async (req, res) => {
  try {
    await Article.deleteMany({});
    res.json({
      success: true,
      message: 'All cached articles cleared'
    });
  } catch (error) {
    console.error('Error clearing articles:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to clear articles'
    });
  }
});

module.exports = router;
