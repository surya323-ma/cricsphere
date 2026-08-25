// backend/server.js - Complete Express Server

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/cricsphere';
mongoose.connect(mongoUri)
.then(() => console.log('✓ MongoDB connected'))
.catch(err => console.error('MongoDB connection error:', err));

// Routes Import
const authRoutes = require('./routes/auth');
const matchRoutes = require('./routes/matches');
const playerRoutes = require('./routes/players');
const newsRoutes = require('./routes/news');
const userRoutes = require('./routes/users');

// Mount Routes
app.use('/api/auth', authRoutes);
app.use('/api/matches', matchRoutes);
app.use('/api/players', playerRoutes);
app.use('/api/news', newsRoutes);
app.use('/api/users', userRoutes);

// Health Check
app.get('/api/seed-now', async (req, res) => {
  try {
    const Admin = require('./models/Admin');
    const existingAdmin = await Admin.findOne({ email: 'admin@cricsphere.com' });
    if (existingAdmin) {
      return res.json({ message: 'Admin already exists' });
    }
    const admin = new Admin({
      name: 'Super Admin',
      email: 'admin@cricsphere.com',
      password: 'admin123',
      role: 'super_admin'
    });
    await admin.save();
    res.json({ message: '✓ Admin created successfully!' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 404 Handler
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// Error Handler
app.use((err, req, res, next) => {
  console.error('Server error:', err);
  res.status(err.status || 500).json({ 
    error: err.message || 'Server error'
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`📊 Health: http://localhost:${PORT}/api/health`);
});

module.exports = app;
