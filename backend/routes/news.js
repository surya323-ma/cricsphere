const express = require('express');
const News = require('../models/News');
const router = express.Router();

// Get all news
router.get('/', async (req, res) => {
  try {
    const { category, featured, limit = 20 } = req.query;
    const query = { isPublished: true };
    
    if (category) query.category = category;
    if (featured === 'true') query.featured = true;
    
    const news = await News.find(query)
      .sort({ publishedAt: -1 })
      .limit(parseInt(limit));
    
    res.json(news);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get featured news
router.get('/featured', async (req, res) => {
  try {
    const featured = await News.find({ featured: true, isPublished: true })
      .sort({ publishedAt: -1 })
      .limit(5);
    
    res.json(featured);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get specific article
router.get('/:id', async (req, res) => {
  try {
    const article = await News.findById(req.params.id);
    if (!article) {
      return res.status(404).json({ error: 'Article not found' });
    }
    
    // Increment views
    await article.incrementViews();
    
    res.json(article);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create article (Admin only)
router.post('/', async (req, res) => {
  try {
    const article = new News({
      ...req.body,
      publishedAt: new Date()
    });
    await article.save();
    
    res.status(201).json({ message: 'Article created', article });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Update article (Admin only)
router.put('/:id', async (req, res) => {
  try {
    const article = await News.findByIdAndUpdate(
      req.params.id,
      { ...req.body, updatedAt: new Date() },
      { new: true }
    );
    
    res.json({ message: 'Article updated', article });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Like article
router.post('/:id/like', async (req, res) => {
  try {
    const article = await News.findById(req.params.id);
    if (!article) {
      return res.status(404).json({ error: 'Article not found' });
    }
    
    await article.addLike();
    
    res.json({ message: 'Article liked', likes: article.likes });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete article (Admin only)
router.delete('/:id', async (req, res) => {
  try {
    await News.findByIdAndDelete(req.params.id);
    res.json({ message: 'Article deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
