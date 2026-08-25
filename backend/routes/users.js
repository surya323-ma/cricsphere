const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const router = express.Router();

const JWT_SECRET = process.env.JWT_SECRET || 'cricsphere-secret-key-2024';

// Middleware to verify user
const verifyUser = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).json({ error: 'No token' });
    
    const decoded = jwt.verify(token, JWT_SECRET);
    const user = await User.findById(decoded.id);
    if (!user) return res.status(401).json({ error: 'User not found' });
    
    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({ error: 'Invalid token' });
  }
};

// Get user profile
router.get('/profile', verifyUser, async (req, res) => {
  try {
    const user = await User.findById(req.user._id)
      .populate('followers', 'name email')
      .populate('following', 'name email');
    
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update user profile
router.put('/profile', verifyUser, async (req, res) => {
  try {
    const { name, bio, favoriteTeam, preferredFormat } = req.body;
    
    const user = await User.findByIdAndUpdate(
      req.user._id,
      { name, bio, favoriteTeam, preferredFormat, updatedAt: new Date() },
      { new: true }
    );
    
    res.json({ message: 'Profile updated', user });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get user's watchlist
router.get('/watchlist', verifyUser, async (req, res) => {
  try {
    const user = await User.findById(req.user._id)
      .populate('watchlist');
    
    res.json(user.watchlist);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Add to watchlist
router.post('/watchlist/:matchId', verifyUser, async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.user._id,
      { $addToSet: { watchlist: req.params.matchId } },
      { new: true }
    );
    
    res.json({ message: 'Added to watchlist', user });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Follow user
router.post('/follow/:userId', verifyUser, async (req, res) => {
  try {
    await User.findByIdAndUpdate(
      req.user._id,
      { $addToSet: { following: req.params.userId } }
    );
    
    await User.findByIdAndUpdate(
      req.params.userId,
      { $addToSet: { followers: req.user._id } }
    );
    
    res.json({ message: 'User followed successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
