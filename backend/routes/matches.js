const express = require('express');
const Match = require('../models/Match');
const router = express.Router();

// Get all matches
router.get('/', async (req, res) => {
  try {
    const { status, format } = req.query;
    const query = {};
    
    if (status) query.status = status;
    if (format) query.format = format;
    
    const matches = await Match.find(query)
      .sort({ startDate: -1 })
      .limit(20);
    
    res.json(matches);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get live matches
router.get('/live', async (req, res) => {
  try {
    const liveMatches = await Match.find({ status: 'Live' });
    res.json(liveMatches);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get specific match
router.get('/:id', async (req, res) => {
  try {
    const match = await Match.findById(req.params.id);
    if (!match) {
      return res.status(404).json({ error: 'Match not found' });
    }
    res.json(match);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create match (Admin only)
router.post('/', async (req, res) => {
  try {
    const match = new Match(req.body);
    await match.save();
    res.status(201).json({ message: 'Match created', match });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Update match (Admin only)
router.put('/:id', async (req, res) => {
  try {
    const match = await Match.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json({ message: 'Match updated', match });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
