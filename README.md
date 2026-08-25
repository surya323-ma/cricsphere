# 🏏 CricSphere - Complete Cricket Platform

A full-stack cricket platform with live scores, player statistics, news, admin dashboard, and ML predictions.

## ⚡ Quick Start (3 Steps)

### Step 1: Clone/Download
```bash
# Already have the code in ~/complete-cricsphere/
cd ~/complete-cricsphere
```

### Step 2: Setup
```bash
bash setup.sh
```

### Step 3: Run
```bash
docker-compose up
```

**Open Browser:**
- Frontend: http://localhost:3000
- Backend API: http://localhost:5000/api/health
- Admin: http://localhost:3000/admin/login

## 📋 Default Credentials

**Admin Login:**
- Email: `admin@cricsphere.com`
- Password: `admin123`

## 🏗️ Project Structure

```
complete-cricsphere/
├── backend/              # Express.js API
│   ├── server.js         # Main server
│   ├── models/           # Database schemas
│   ├── routes/           # API endpoints
│   ├── middleware/       # Auth, security
│   ├── utils/            # Helper functions
│   ├── package.json
│   └── Dockerfile
│
├── frontend/             # React App
│   ├── src/
│   │   ├── App.jsx       # Main app
│   │   ├── pages/        # Page components
│   │   ├── components/   # Reusable components
│   │   ├── hooks/        # React hooks
│   │   └── index.css
│   ├── package.json
│   └── Dockerfile
│
├── python-service/       # Flask ML Service
│   ├── app.py            # ML predictions
│   ├── requirements.txt
│   └── Dockerfile
│
├── docker-compose.yml    # Container orchestration
├── setup.sh              # Setup script
└── README.md             # This file
```

## 🚀 Features

### Customer Features
- ✅ Live cricket scores
- ✅ Player profiles & stats
- ✅ Cricket news
- ✅ User authentication
- ✅ Watchlist
- ✅ Follow other users

### Admin Features
- ✅ Manage matches
- ✅ Add players
- ✅ Publish news
- ✅ View analytics
- ✅ Manage admins

### Technical Features
- ✅ Real-time WebSocket updates
- ✅ ML predictions (Python)
- ✅ JWT authentication
- ✅ MongoDB database
- ✅ Docker containerization
- ✅ RESTful API

## 📚 API Endpoints

### Authentication
```
POST /api/auth/register        # User registration
POST /api/auth/login           # User login
POST /api/auth/verify          # Verify token
```

### Matches
```
GET  /api/matches              # Get all matches
GET  /api/matches/live         # Get live matches
GET  /api/matches/:id          # Get specific match
POST /api/matches              # Create match (Admin)
PUT  /api/matches/:id          # Update match (Admin)
```

### Users
```
GET  /api/users/profile        # Get user profile
PUT  /api/users/profile        # Update profile
GET  /api/users/watchlist      # Get watchlist
POST /api/users/watchlist/:id  # Add to watchlist
POST /api/users/follow/:id     # Follow user
```

### Predictions
```
POST /api/predict/match        # Get match prediction
GET  /api/stats/trends         # Get trending stats
```

## 🔧 Manual Setup (Without Docker)

### Prerequisites
- Node.js 18+
- Python 3.11+
- MongoDB 7.0+

### Backend Setup
```bash
cd backend
npm install
# Create .env file with MONGODB_URI
npm start
# Server runs on http://localhost:5000
```

### Frontend Setup
```bash
cd frontend
npm install
npm run dev
# App runs on http://localhost:3000
```

### Python Service Setup
```bash
cd python-service
pip install -r requirements.txt
python app.py
# Service runs on http://localhost:5001
```

## 🗄️ Database

MongoDB collections:
- `users` - Customer accounts
- `matches` - Cricket matches
- `players` - Player data
- `news` - Articles
- `admins` - Admin accounts

## 🔐 Security Features

- JWT authentication
- Password hashing (bcryptjs)
- Rate limiting
- CORS configuration
- Input validation
- MongoDB injection protection

## 📊 Technology Stack

**Frontend:**
- React 18
- React Router
- Tailwind CSS
- Axios
- Lucide Icons

**Backend:**
- Express.js
- MongoDB
- Mongoose
- JWT
- bcryptjs

**ML/Data:**
- Flask
- NumPy
- Pandas
- Scikit-learn

**DevOps:**
- Docker
- Docker Compose
- Bash scripting

## 🚢 Deployment

### Deploy to Render

1. Push to GitHub
2. Create Render account
3. New Web Service → Connect GitHub
4. Build: `npm install`
5. Start: `npm start`

### Deploy to Heroku

```bash
heroku create cricsphere
git push heroku main
heroku config:set MONGODB_URI=your_mongo_uri
heroku logs --tail
```

## 📝 Environment Variables

### Backend (.env)
```
MONGODB_URI=mongodb://localhost:27017/cricsphere
JWT_SECRET=your-secret-key
PORT=5000
NODE_ENV=development
```

### Frontend (.env)
```
REACT_APP_API_URL=http://localhost:5000
REACT_APP_WS_URL=ws://localhost:5002
```

## 🐛 Troubleshooting

### MongoDB connection fails
- Ensure MongoDB is running
- Check MONGODB_URI in .env
- Verify credentials

### Port already in use
```bash
# Find process using port
lsof -i :5000
# Kill process
kill -9 <PID>
```

### Docker build fails
```bash
# Clear Docker cache
docker system prune -a
# Rebuild
docker-compose build --no-cache
```

## 📚 API Documentation

Full API docs available at:
- http://localhost:5000/api/docs (when enabled)

## 🤝 Contributing

1. Fork the repository
2. Create feature branch
3. Commit changes
4. Push to branch
5. Create Pull Request

## 📄 License

MIT License - feel free to use this project

## 💬 Support

Having issues? Check:
1. README.md (this file)
2. Docker logs: `docker-compose logs`
3. API response errors
4. Browser console errors

## 🎯 Next Steps

1. Customize the design
2. Add real cricket API integration
3. Implement push notifications
4. Add mobile app (React Native)
5. Deploy to production

---

**Happy Coding! 🚀**

**CricSphere © 2024**
