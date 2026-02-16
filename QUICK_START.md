# ⚡ Quick Start Guide

Get your News Aggregator running in 5 minutes!

## ✅ Prerequisites Check

Before starting, make sure you have:

1. **Node.js** installed (v14 or higher)
   ```bash
   node --version
   ```
   If not installed: [Download Node.js](https://nodejs.org/)

2. **MongoDB** installed and running
   ```bash
   # Check if MongoDB is running
   mongosh --eval "db.version()"
   ```
   If not installed: [Download MongoDB](https://www.mongodb.com/try/download/community)

3. **NewsAPI Key**
   - Go to [NewsAPI.org](https://newsapi.org/)
   - Click "Get API Key"
   - Sign up (free)
   - Copy your API key

## 🚀 Installation Steps

### Step 1: Download the Project

```bash

git clone <your-repository-url>
cd news-aggregator

```

### Step 2: Setup Backend

```bash
# Navigate to backend folder
cd backend

# Install dependencies (this will take 1-2 minutes)
npm install

# Create environment file
# On Windows:
copy .env.example .env

# On Mac/Linux:
cp .env.example .env
```

**Edit the `.env` file:**

Open `backend/.env` in any text editor and update:

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/news-aggregator
NEWS_API_KEY=paste_your_api_key_here
```

### Step 3: Setup Frontend

Open a **NEW terminal window** (keep backend terminal open):

```bash
# Navigate to frontend folder
cd frontend

# Install dependencies (this will take 1-2 minutes)
npm install
```

### Step 4: Start MongoDB

**If MongoDB is not running:**

```bash
# Windows (run as Administrator):
net start MongoDB

# Mac:
brew services start mongodb-community

# Linux:
sudo systemctl start mongod
```

### Step 5: Start the Application

**Terminal 1 (Backend):**
```bash
cd backend
npm start
```

✅ You should see:
```
Server running on port 5000
MongoDB connected successfully
```

**Terminal 2 (Frontend):**
```bash
cd frontend
npm start
```

✅ Browser should open automatically at `http://localhost:3000`

## 🎉 First Steps in the App

1. **Fetch News**: Click "🔄 Fetch Latest News" button
2. **Wait**: It takes 2-3 seconds to fetch from NewsAPI
3. **Browse**: Scroll through the articles
4. **Search**: Try searching for "technology" or "sports"
5. **Filter**: Use the category dropdown to filter articles

## 🔧 Troubleshooting

### Backend won't start

**Problem**: "Port 5000 already in use"
```bash
# Kill process on port 5000
# Windows:
netstat -ano | findstr :5000
taskkill /PID <process_id> /F

# Mac/Linux:
lsof -ti:5000 | xargs kill -9
```

**Problem**: "MongoDB connection failed"
```bash
# Make sure MongoDB is running
mongosh --eval "db.version()"

# If not working, try:
# Windows: Run MongoDB Compass and start local server
# Mac: brew services restart mongodb-community
# Linux: sudo systemctl restart mongod
```

**Problem**: "Cannot find module 'express'"
```bash
# Delete node_modules and reinstall
cd backend
rm -rf node_modules
npm install
```

### Frontend won't start

**Problem**: "Port 3000 already in use"
- Close other applications using port 3000
- Or press 'Y' when asked to use another port

**Problem**: "Cannot connect to backend"
- Make sure backend is running (check Terminal 1)
- Check `http://localhost:5000` in browser
- Should see: "News Aggregator API"

**Problem**: "npm: command not found"
- Node.js is not installed or not in PATH
- Reinstall Node.js from [nodejs.org](https://nodejs.org/)
- Restart terminal after installation

### No articles showing

**Problem**: API key invalid
- Check your NewsAPI key in `backend/.env`
- Make sure there are no spaces around the key
- Get a new key from [NewsAPI.org](https://newsapi.org/)

**Problem**: Rate limit exceeded
- NewsAPI free tier: 100 requests/day
- Wait 24 hours or upgrade your plan
- Use cached articles in the meantime

## 📱 Testing the Features

### 1. Fetch Fresh News
```
Click "Fetch Latest News" → Wait 2-3 seconds → Articles appear
```

### 2. Search
```
Type "climate" in search box → Press Enter or Click Search → Results appear
```

### 3. Filter by Category
```
Select "Technology" from dropdown → Technology articles appear
```

### 4. Read Article
```
Click "Read More" on any article → Opens full article in new tab
```

## 🎯 What to Do Next

1. **Explore the Code**
   - Open `frontend/src/App.js` to see main logic
   - Open `backend/routes/news.js` to see API endpoints
   - Open any component file to understand React

2. **Read the Guides**
   - `BEGINNER_GUIDE.md` - Understanding how it works
   - `API_DOCS.md` - All API endpoints explained
   - `CONTRIBUTING.md` - How to add features

3. **Make It Your Own**
   - Change colors in CSS files
   - Modify the header text
   - Add new categories
   - Customize article card design

4. **Deploy It**
   - Follow `DEPLOYMENT.md` to put it online
   - Share with friends!

## 💡 Pro Tips

1. **Keep Backend Running**: Always start backend before frontend
2. **Check Console**: Press F12 in browser to see errors
3. **MongoDB Compass**: Use MongoDB Compass GUI for database viewing
4. **Hot Reload**: Frontend auto-refreshes when you edit code
5. **Restart Backend**: Restart backend server after changing backend code

## 📞 Still Stuck?

1. **Check Error Messages**: Read them carefully - they usually tell you what's wrong
2. **Google the Error**: Copy/paste error messages into Google
3. **Check Prerequisites**: Ensure Node, MongoDB are properly installed
4. **Fresh Start**: Delete `node_modules` folders and run `npm install` again
5. **Ask for Help**: Create an issue on GitHub with:
   - What you tried to do
   - What error you got
   - Screenshots if possible

## 🎓 Learning Path

Want to understand better?

**Week 1**: JavaScript basics
**Week 2**: React fundamentals  
**Week 3**: Node.js and Express
**Week 4**: MongoDB basics
**Week 5**: Put it all together

Resources in `BEGINNER_GUIDE.md`!

## ✨ Success Checklist

- [ ] Node.js installed and working
- [ ] MongoDB installed and running
- [ ] NewsAPI key obtained
- [ ] Backend dependencies installed
- [ ] Frontend dependencies installed
- [ ] Backend server running (port 5000)
- [ ] Frontend app running (port 3000)
- [ ] Articles loading successfully
- [ ] Search working
- [ ] Category filter working
- [ ] Can read full articles

---

**Congratulations! You're now running a full-stack web application! 🎉**

Take your time to explore, experiment, and most importantly - have fun learning!
