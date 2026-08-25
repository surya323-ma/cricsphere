const express = require('express');
const Player = require('../models/Player');
const router = express.Router();

// Get all players
router.get('/', async (req, res) => {
  try {
    const { country, role, limit = 50 } = req.query;
    const query = {};
    
    if (country) query.country = country;
    if (role) query.role = role;
    
    const players = await Player.find(query)
      .limit(parseInt(limit))
      .sort({ name: 1 });
    
    res.json(players);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get specific player
router.get('/:id', async (req, res) => {
  try {
    const player = await Player.findById(req.params.id);
    if (!player) {
      return res.status(404).json({ error: 'Player not found' });
    }
    res.json(player);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get player stats
router.get('/:id/stats', async (req, res) => {
  try {
    const player = await Player.findById(req.params.id);
    if (!player) {
      return res.status(404).json({ error: 'Player not found' });
    }
    
    res.json({
      player: player.name,
      role: player.role,
      stats: player.stats,
      careerHighs: player.careerHighs
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create player (Admin only)
router.post('/', async (req, res) => {
  try {
    const player = new Player(req.body);
    await player.save();
    
    res.status(201).json({ message: 'Player created', player });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Update player (Admin only)
router.put('/:id', async (req, res) => {
  try {
    const player = await Player.findByIdAndUpdate(
      req.params.id,
      { ...req.body, updatedAt: new Date() },
      { new: true }
    );
    
    res.json({ message: 'Player updated', player });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Search players
router.get('/search/:name', async (req, res) => {
  try {
    const players = await Player.find({
      $text: { $search: req.params.name }
    });
    
    res.json(players);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete player (Admin only)
router.delete('/:id', async (req, res) => {
  try {
    await Player.findByIdAndDelete(req.params.id);
    res.json({ message: 'Player deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
