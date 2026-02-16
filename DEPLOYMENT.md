# 🚀 Deployment Guide

This guide will help you deploy your News Aggregator application to the web.

## Deployment Options

### Option 1: Deploy to Render (Recommended for Beginners)

#### Backend Deployment (Render)

1. **Push your code to GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin <your-github-repo-url>
   git push -u origin main
   ```

2. **Create a Render account**
   - Visit [render.com](https://render.com)
   - Sign up with GitHub

3. **Deploy Backend**
   - Click "New +" → "Web Service"
   - Connect your GitHub repository
   - Configure:
     - Name: `news-aggregator-backend`
     - Root Directory: `backend`
     - Build Command: `npm install`
     - Start Command: `npm start`
   - Add Environment Variables:
     - `MONGODB_URI`: Your MongoDB Atlas connection string
     - `NEWS_API_KEY`: Your NewsAPI key
     - `PORT`: 5000
   - Click "Create Web Service"

4. **Get your backend URL** (e.g., `https://news-aggregator-backend.onrender.com`)

#### Frontend Deployment (Netlify)

1. **Update API URL in frontend**
   - In `frontend/src/App.js`, change:
   ```javascript
   const API_URL = 'https://your-backend-url.onrender.com/api/news';
   ```

2. **Create a Netlify account**
   - Visit [netlify.com](https://netlify.com)
   - Sign up with GitHub

3. **Deploy Frontend**
   - Click "Add new site" → "Import an existing project"
   - Choose your GitHub repository
   - Configure:
     - Base directory: `frontend`
     - Build command: `npm run build`
     - Publish directory: `frontend/build`
   - Click "Deploy site"

### Option 2: Deploy to Vercel

#### Backend (Vercel)

1. Install Vercel CLI:
   ```bash
   npm install -g vercel
   ```

2. From backend folder:
   ```bash
   cd backend
   vercel
   ```

3. Follow prompts and set environment variables on Vercel dashboard

#### Frontend (Vercel)

1. From frontend folder:
   ```bash
   cd frontend
   vercel
   ```

2. Update `API_URL` in App.js with your backend URL

### Option 3: Deploy to Heroku

#### Backend (Heroku)

1. Install Heroku CLI and login:
   ```bash
   heroku login
   ```

2. Create Heroku app:
   ```bash
   cd backend
   heroku create news-aggregator-backend
   ```

3. Set environment variables:
   ```bash
   heroku config:set MONGODB_URI=your_mongodb_uri
   heroku config:set NEWS_API_KEY=your_api_key
   ```

4. Deploy:
   ```bash
   git push heroku main
   ```

#### Frontend (Netlify/Vercel)
- Follow the same steps as Option 1 for frontend

## MongoDB Atlas Setup (Cloud Database)

1. **Create MongoDB Atlas account**
   - Visit [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
   - Sign up for free

2. **Create a cluster**
   - Choose FREE tier (M0)
   - Select a cloud provider and region
   - Click "Create Cluster"

3. **Setup database access**
   - Click "Database Access" in left menu
   - Click "Add New Database User"
   - Create username and password
   - Save credentials securely

4. **Setup network access**
   - Click "Network Access"
   - Click "Add IP Address"
   - Choose "Allow Access from Anywhere" (0.0.0.0/0)
   - Click "Confirm"

5. **Get connection string**
   - Click "Database" → "Connect"
   - Choose "Connect your application"
   - Copy connection string
   - Replace `<password>` with your password
   - Use this as your `MONGODB_URI`

## Testing Your Deployment

1. Visit your frontend URL
2. Click "Fetch Latest News" button
3. Verify articles load correctly
4. Test search and filtering features
5. Check browser console for any errors

## Troubleshooting Deployment

### CORS Errors
Add your frontend URL to backend CORS configuration:

```javascript
// In server.js
app.use(cors({
  origin: 'https://your-frontend-url.netlify.app'
}));
```

### API Key Issues
- Verify your NewsAPI key is valid
- Check it's properly set in environment variables
- Free tier has rate limits (100 requests/day)

### MongoDB Connection Issues
- Verify IP whitelist includes 0.0.0.0/0
- Check connection string format
- Ensure password has no special characters causing issues

### Build Failures
- Check Node.js version compatibility
- Verify all dependencies are in package.json
- Review build logs for specific errors

## Environment Variables Checklist

**Backend:**
- ✅ `PORT`
- ✅ `MONGODB_URI`
- ✅ `NEWS_API_KEY`

**Frontend:**
- ✅ Update API_URL in App.js before deploying

## Post-Deployment

1. Test all features thoroughly
2. Monitor error logs
3. Set up analytics (optional)
4. Add custom domain (optional)
5. Enable HTTPS (usually automatic)

## Cost Considerations

- **Render Free Tier**: Auto-sleeps after 15 min of inactivity
- **Netlify Free Tier**: 100 GB bandwidth/month
- **MongoDB Atlas Free Tier**: 512 MB storage
- **NewsAPI Free Tier**: 100 requests/day

Need more? Consider upgrading plans.

---

**Congratulations! Your app is now live! 🎉**
