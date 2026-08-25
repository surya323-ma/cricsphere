const mongoose = require('mongoose');

const newsSchema = new mongoose.Schema({
  title: { type: String, required: true },
  excerpt: { type: String, required: true },
  content: { type: String, required: true },
  
  category: {
    type: String,
    enum: ['Match', 'Player News', 'Series', 'Events', 'Domestic', 'Technology', 'Other'],
    default: 'Other'
  },
  
  author: { type: String, required: true },
  authorId: { type: mongoose.Schema.Types.ObjectId, ref: 'Admin' },
  
  featured: { type: Boolean, default: false },
  views: { type: Number, default: 0 },
  likes: { type: Number, default: 0 },
  
  relatedPlayers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Player' }],
  relatedMatches: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Match' }],
  
  tags: [String],
  imageUrl: String,
  
  isPublished: { type: Boolean, default: true },
  publishedAt: Date,
  
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

// Index for faster queries
newsSchema.index({ category: 1, publishedAt: -1 });
newsSchema.index({ title: 'text', content: 'text' });

// Increment views
newsSchema.methods.incrementViews = function() {
  this.views += 1;
  return this.save();
};

// Add like
newsSchema.methods.addLike = function() {
  this.likes += 1;
  return this.save();
};

module.exports = mongoose.model('News', newsSchema);
