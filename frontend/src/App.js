

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import FilterBar from './components/FilterBar';
import ArticleList from './components/ArticleList';
import './App.css';

// Debug: Log the API URL being used
// Using Render backend
const BACKEND_BASE_URL = 'https://news-aggregrator-backend.onrender.com';
const API_URL = process.env.REACT_APP_API_URL || `${BACKEND_BASE_URL}/api/news`;

console.log('📡 API URL:', API_URL);
console.log('🔍 Backend Base URL:', BACKEND_BASE_URL);
console.log('🔍 Environment Variable REACT_APP_API_URL:', process.env.REACT_APP_API_URL);
console.log('🔍 Using fallback:', !process.env.REACT_APP_API_URL);

function App() {

  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentFilter, setCurrentFilter] = useState('all');

  useEffect(() => {
    fetchCachedArticles();
  }, []);

  const fetchCachedArticles = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await axios.get(API_URL);
      
      if (response.data.success) {
        setArticles(response.data.data);
      } else {
        setError('Failed to load articles');
      }
    } catch (err) {
      console.error('Error fetching articles:', err);
      setError('Unable to connect to server. Please ensure backend is running.');
    } finally {
      setLoading(false);
    }
  };

  const fetchLatestNews = async (category = 'general') => {
    try {
      setLoading(true);
      setError(null);
      
      console.log(`🔄 Fetching news from: ${API_URL}/fetch`);
      const response = await axios.get(`${API_URL}/fetch`, {
        params: { category: category !== 'all' ? category : 'general' },
        timeout: 10000
      });
      
      console.log('📡 Response:', response.data);
      
      if (response.data.success) {
        setArticles(response.data.data);
        alert(`✅ Fetched ${response.data.count} articles!`);
      } else {
        setError(`Failed to fetch: ${response.data.message || 'Unknown error'}`);
      }
    } catch (err) {
      console.error('❌ Error fetching latest news:', err);
      
      let errorMessage = 'Failed to fetch news.';
      if (err.response?.data?.error) {
        errorMessage += ` Backend says: ${err.response.data.error}`;
      } else if (err.message) {
        errorMessage += ` ${err.message}`;
      }
      
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async (keyword) => {
    if (!keyword.trim()) {
      
      fetchCachedArticles();
      return;
    }

    try {
      setLoading(true);
      setError(null);
      
      const response = await axios.get(`${API_URL}/search`, {
        params: { keyword }
      });
      
      if (response.data.success) {
        setArticles(response.data.data);
      } else {
        setError('Search failed');
      }
    } catch (err) {
      console.error('Error searching articles:', err);
      setError('Search failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleCategoryChange = async (category) => {
    setCurrentFilter(category);

    if (category === 'all') {
      fetchCachedArticles();
      return;
    }

    try {
      setLoading(true);
      setError(null);
      
      const response = await axios.get(`${API_URL}/category/${category}`);
      
      if (response.data.success) {
        setArticles(response.data.data);
      } else {
        setError('Failed to filter by category');
      }
    } catch (err) {
      console.error('Error filtering by category:', err);
      setError('Filter failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleRefresh = () => {
    fetchLatestNews(currentFilter);
  };

  return (
    <div className="App">
      {/* Header */}
      <header className="app-header">
        <h1>📰 News Aggregator</h1>
        <p>Stay updated with the latest news from around the world</p>
      </header>

      {/* Main Content */}
      <main className="app-main">
        <FilterBar
          onSearch={handleSearch}
          onCategoryChange={handleCategoryChange}
          onRefresh={handleRefresh}
        />
        
        <ArticleList
          articles={articles}
          loading={loading}
          error={error}
        />
      </main>

      {/* Footer */}
      <footer className="app-footer">
        <p>Powered by NewsAPI | Built with React & Node.js</p>
      </footer>
    </div>
  );
}

export default App;
