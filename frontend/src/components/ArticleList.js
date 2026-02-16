

import React from 'react';
import ArticleCard from './ArticleCard';
import './ArticleList.css';

function ArticleList({ articles, loading, error }) {

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>Loading articles...</p>
      </div>
    );
  }

  
  if (error) {
    return (
      <div className="error-container">
        <p className="error-message">❌ {error}</p>
        <p className="error-hint">Please check your backend server and API key.</p>
      </div>
    );
  }

  if (!articles || articles.length === 0) {
    return (
      <div className="empty-container">
        <p className="empty-message">📰 No articles found</p>
        <p className="empty-hint">Try searching with different keywords or fetch latest news.</p>
      </div>
    );
  }

  return (
    <div className="article-list">
      {articles.map((article) => (
        <ArticleCard key={article._id || article.articleId} article={article} />
      ))}
    </div>
  );
}

export default ArticleList;
