
import React, { useState } from 'react';
import './FilterBar.css';

function FilterBar({ onSearch, onCategoryChange, onRefresh }) {
  const [searchKeyword, setSearchKeyword] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { value: 'all', label: 'All News' },
    { value: 'general', label: 'General' },
    { value: 'business', label: 'Business' },
    { value: 'technology', label: 'Technology' },
    { value: 'science', label: 'Science' },
    { value: 'health', label: 'Health' },
    { value: 'sports', label: 'Sports' },
    { value: 'entertainment', label: 'Entertainment' }
  ];

  const handleSearch = (e) => {
    e.preventDefault();
    onSearch(searchKeyword);
  };

  const handleCategoryChange = (e) => {
    const category = e.target.value;
    setSelectedCategory(category);
    onCategoryChange(category);
  };

  const handleClearSearch = () => {
    setSearchKeyword('');
    onSearch('');
  };

  return (
    <div className="filter-bar">
      <div className="filter-container">
        {/* Search Form */}
        <form onSubmit={handleSearch} className="search-form">
          <input
            type="text"
            placeholder="Search articles by keyword..."
            value={searchKeyword}
            onChange={(e) => setSearchKeyword(e.target.value)}
            className="search-input"
          />
          <button type="submit" className="search-btn">
            🔍 Search
          </button>
          {searchKeyword && (
            <button 
              type="button" 
              onClick={handleClearSearch}
              className="clear-btn"
            >
              ✕
            </button>
          )}
        </form>

        {/* Category Filter */}
        <div className="category-filter">
          <label htmlFor="category">Category:</label>
          <select
            id="category"
            value={selectedCategory}
            onChange={handleCategoryChange}
            className="category-select"
          >
            {categories.map((cat) => (
              <option key={cat.value} value={cat.value}>
                {cat.label}
              </option>
            ))}
          </select>
        </div>

        {/* Refresh Button */}
        <button onClick={onRefresh} className="refresh-btn">
          🔄 Fetch Latest News
        </button>
      </div>
    </div>
  );
}

export default FilterBar;
