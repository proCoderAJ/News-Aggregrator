# 📡 API Documentation

Complete reference for all backend API endpoints.

## Base URL

```
http://localhost:5000/api/news
```

## Endpoints

### 1. Get All Cached Articles

Retrieve all articles stored in the database.

**Endpoint:** `GET /api/news`

**Query Parameters:** None

**Response:**
```json
{
  "success": true,
  "count": 50,
  "data": [
    {
      "_id": "507f1f77bcf86cd799439011",
      "articleId": "CNN-2024-01-15-Breaking-News",
      "title": "Breaking News Story",
      "description": "This is a news story description",
      "content": "Full article content...",
      "source": "CNN",
      "author": "John Doe",
      "url": "https://example.com/article",
      "urlToImage": "https://example.com/image.jpg",
      "publishedAt": "2024-01-15T10:30:00Z",
      "category": "general",
      "cachedAt": "2024-01-15T10:35:00Z"
    }
  ]
}
```

**Example Request:**
```bash
curl http://localhost:5000/api/news
```

---

### 2. Fetch Fresh Articles from NewsAPI

Fetch the latest articles from NewsAPI and cache them in the database.

**Endpoint:** `GET /api/news/fetch`

**Query Parameters:**
| Parameter | Type   | Default   | Description                    |
|-----------|--------|-----------|--------------------------------|
| category  | string | general   | News category to fetch         |
| country   | string | us        | Country code (us, gb, in, etc) |

**Response:**
```json
{
  "success": true,
  "message": "Fetched 20 articles, saved 18 new articles",
  "count": 18,
  "data": [...]
}
```

**Example Requests:**
```bash
# Fetch general news from US
curl http://localhost:5000/api/news/fetch

# Fetch technology news
curl http://localhost:5000/api/news/fetch?category=technology

# Fetch business news from UK
curl http://localhost:5000/api/news/fetch?category=business&country=gb
```

**Available Categories:**
- general
- business
- technology
- science
- health
- sports
- entertainment

**Available Countries:**
- us (United States)
- gb (United Kingdom)
- in (India)
- au (Australia)
- ca (Canada)
- [See NewsAPI docs for full list](https://newsapi.org/docs/endpoints/sources)

---

### 3. Search Articles by Keyword

Search for articles containing a specific keyword in title, description, or content.

**Endpoint:** `GET /api/news/search`

**Query Parameters:**
| Parameter | Type   | Required | Description           |
|-----------|--------|----------|-----------------------|
| keyword   | string | Yes      | Search term           |

**Response:**
```json
{
  "success": true,
  "count": 12,
  "data": [...]
}
```

**Example Requests:**
```bash
# Search for "climate"
curl http://localhost:5000/api/news/search?keyword=climate

# Search for "artificial intelligence"
curl "http://localhost:5000/api/news/search?keyword=artificial%20intelligence"
```

**Notes:**
- Search is case-insensitive
- Searches in title, description, and content fields
- Uses MongoDB regex for partial matching

---

### 4. Get Articles by Category

Filter articles by a specific category.

**Endpoint:** `GET /api/news/category/:category`

**Path Parameters:**
| Parameter | Type   | Description        |
|-----------|--------|--------------------|
| category  | string | Category name      |

**Response:**
```json
{
  "success": true,
  "count": 25,
  "category": "technology",
  "data": [...]
}
```

**Example Requests:**
```bash
# Get technology articles
curl http://localhost:5000/api/news/category/technology

# Get sports articles
curl http://localhost:5000/api/news/category/sports
```

---

### 5. Clear All Cached Articles

Delete all articles from the database. Useful for testing or resetting data.

**Endpoint:** `DELETE /api/news/clear`

**Query Parameters:** None

**Response:**
```json
{
  "success": true,
  "message": "All cached articles cleared"
}
```

**Example Request:**
```bash
curl -X DELETE http://localhost:5000/api/news/clear
```

**⚠️ Warning:** This permanently deletes all articles. Use with caution.

---

## Error Responses

All endpoints may return error responses in this format:

```json
{
  "success": false,
  "message": "Error description here"
}
```

**Common HTTP Status Codes:**
- `200` - Success
- `400` - Bad Request (missing parameters)
- `404` - Not Found
- `500` - Server Error

**Example Error:**
```json
{
  "success": false,
  "message": "Please provide a keyword to search"
}
```

---

## Testing with Postman

1. **Import Collection**
   - Create a new collection called "News Aggregator"
   - Add requests for each endpoint above

2. **Set Environment Variables**
   - Base URL: `http://localhost:5000`

3. **Test Sequence**
   - First: Fetch fresh articles
   - Then: Get all articles
   - Finally: Try search and filtering

---

## Using Axios in Frontend

```javascript
import axios from 'axios';

const API_URL = 'http://localhost:5000/api/news';

// Get all articles
const articles = await axios.get(API_URL);

// Fetch latest news
const fresh = await axios.get(`${API_URL}/fetch?category=technology`);

// Search
const results = await axios.get(`${API_URL}/search?keyword=climate`);

// Filter by category
const tech = await axios.get(`${API_URL}/category/technology`);
```

---

## Rate Limits

### NewsAPI Limits (Free Tier)
- 100 requests per day
- 1 request per second
- Only recent articles (last 30 days)

**Tips to avoid hitting limits:**
- Use cached articles when possible
- Implement request throttling
- Only fetch fresh articles when needed

### MongoDB Atlas Limits (Free Tier)
- 512 MB storage
- ~thousands of articles capacity
- Implement cleanup of old articles if needed

---

## Response Time

Typical response times:
- Cached articles: 50-200ms
- Fresh fetch: 2-5 seconds (depends on NewsAPI)
- Search: 100-300ms
- Category filter: 100-300ms

---

## Best Practices

1. **Cache First**: Always try cached articles before fetching fresh ones
2. **Handle Errors**: Wrap API calls in try-catch blocks
3. **Loading States**: Show loading indicators during API calls
4. **Debounce Search**: Don't search on every keystroke
5. **Pagination**: Implement pagination for large result sets

---

## Example Integration

Complete example of using all endpoints:

```javascript
async function useNewsAPI() {
  try {
    
    const cached = await axios.get('/api/news');
    displayArticles(cached.data.data);

    const fresh = await axios.get('/api/news/fetch?category=technology');
    displayArticles(fresh.data.data);

    const search = await axios.get('/api/news/search?keyword=AI');
    displayArticles(search.data.data);

    const filtered = await axios.get('/api/news/category/sports');
    displayArticles(filtered.data.data);

  } catch (error) {
    console.error('API Error:', error);
    showError('Failed to load articles');
  }
}
```

---

