
import React from 'react';
import './ArticleCard.css';

function ArticleCard({ article }) {

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const imageUrl = article.urlToImage || 'https://via.placeholder.com/400x250?text=No+Image';

  return (
    <div className="article-card">
      <div className="article-image">
        <img 
          src={imageUrl} 
          alt={article.title}
          onError={(e) => {
            e.target.src = 'https://via.placeholder.com/400x250?text=No+Image';
          }}
        />
        <div className="article-category">{article.category}</div>
      </div>
      
      <div className="article-content">
        <h3 className="article-title">{article.title}</h3>
        
        <div className="article-meta">
          <span className="article-source">{article.source}</span>
          <span className="article-date">{formatDate(article.publishedAt)}</span>
        </div>
        
        <p className="article-description">
          {article.description || 'No description available.'}
        </p>
        
        <a 
          href={article.url} 
          target="_blank" 
          rel="noopener noreferrer" 
          className="read-more-btn"
        >
          Read More →
        </a>
      </div>
    </div>
  );
}

export default ArticleCard;
