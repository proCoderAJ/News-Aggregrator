# 📰 News Aggregator Application

A beginner-friendly news feed aggregator that fetches articles from NewsAPI and allows filtering by keywords and categories.

## 🚀 Features

- Fetch latest news articles from public API
- Filter articles by keywords
- Filter articles by category (Technology, Business, Sports, etc.)
- Cache articles in MongoDB for better performance
- Clean and responsive user interface

## 📋 Prerequisites

Before you begin, make sure you have installed:
- [Node.js](https://nodejs.org/) (v14 or higher)
- [MongoDB](https://www.mongodb.com/try/download/community) (or use MongoDB Atlas for cloud database)
- A text editor (VS Code recommended)

## 🔑 Getting Your API Key

1. Visit [NewsAPI](https://newsapi.org/)
2. Click "Get API Key" and sign up for a free account
3. Copy your API key (you'll need it in the setup)

## 📦 Installation & Setup

### Step 1: Clone or Download the Project

```bash

git clone <your-repository-url>
cd news-aggregator

```

### Step 2: Install Backend Dependencies

```bash
cd backend
npm install
```

### Step 3: Configure Environment Variables

Create a `.env` file in the `backend` folder:

```bash
cd backend

```

Edit the `.env` file and add your API key:

```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/news-aggregator
NEWS_API_KEY=your_api_key_here
```

### Step 4: Install Frontend Dependencies

```bash
cd ../frontend
npm install
```

### Step 5: Start MongoDB

**Option A: Local MongoDB**
```bash
```

**Option B: MongoDB Atlas (Cloud)**
- Use the connection string from MongoDB Atlas in your `.env` file

### Step 6: Run the Application

**Terminal 1 - Start Backend:**
```bash
cd backend
npm start
```

You should see: `Server running on port 5000` and `MongoDB connected`

**Terminal 2 - Start Frontend:**
```bash
cd frontend
npm start
```

The app will open in your browser at `http://localhost:3000`

## 🎯 How to Use

1. **View Articles**: The homepage displays the latest news articles
2. **Search by Keyword**: Type a keyword (e.g., "technology") in the search box
3. **Filter by Category**: Select a category from the dropdown menu
4. **Read Full Article**: Click "Read More" to open the full article in a new tab

## 📁 Project Structure

```
news-aggregator/
├── backend/
│   ├── models/
│   │   └── Article.js          # MongoDB schema for articles
│   ├── routes/
│   │   └── news.js             # API routes for fetching news
│   ├── .env                    # Environment variables (create this)
│   ├── .env.example            # Environment variables template
│   ├── server.js               # Express server setup
│   └── package.json
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   │   ├── ArticleCard.js  # Individual article display
│   │   │   ├── FilterBar.js    # Search and category filters
│   │   │   └── ArticleList.js  # List of all articles
│   │   ├── App.js              # Main application component
│   │   ├── App.css             # Styles
│   │   └── index.js            # React entry point
│   └── package.json
└── README.md
```

## 🔧 Troubleshooting

### Backend won't start
- Check if MongoDB is running
- Verify your `.env` file has the correct values
- Make sure port 5000 is not in use

### Frontend won't start
- Check if backend is running first
- Make sure port 3000 is not in use
- Clear npm cache: `npm cache clean --force`

### No articles showing
- Verify your NewsAPI key is valid
- Check your internet connection
- Look at the browser console (F12) for error messages

### MongoDB connection error
- Ensure MongoDB is running
- Check your MongoDB URI in `.env`
- For local MongoDB: make sure it's installed and started

## 📝 API Endpoints

- `GET /api/news` - Fetch all cached articles
- `GET /api/news/fetch` - Fetch fresh articles from NewsAPI
- `GET /api/news/search?keyword=term` - Search articles by keyword
- `GET /api/news/category/:category` - Filter by category

## 🌟 Next Steps (Optional Enhancements)

Once you're comfortable with the basics:
- Add pagination for more articles
- Implement date range filtering
- Add favorite/bookmark functionality
- Create user authentication
- Add more news sources

## 📚 Learning Resources

- [React Documentation](https://react.dev/)
- [Express.js Guide](https://expressjs.com/)
- [MongoDB Tutorial](https://www.mongodb.com/docs/manual/tutorial/)
- [NewsAPI Documentation](https://newsapi.org/docs)

## 🤝 Getting Help

If you encounter issues:
1. Check the Troubleshooting section above
2. Read the error messages carefully
3. Search for the error on Google or Stack Overflow
4. Check that all dependencies are installed

## 📄 License

This project is open source and available for learning purposes.

---

**Happy Coding! 🚀**
