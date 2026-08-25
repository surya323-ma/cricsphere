const mongoose = require('mongoose');

const playerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  country: { type: String, required: true },
  role: { type: String, enum: ['Batsman', 'Bowler', 'All-rounder'], required: true },
  jersey: Number,
  dateOfBirth: Date,
  
  stats: {
    test: {
      matches: { type: Number, default: 0 },
      runs: { type: Number, default: 0 },
      wickets: { type: Number, default: 0 },
      avg: { type: Number, default: 0 },
      bestPerformance: String
    },
    odi: {
      matches: { type: Number, default: 0 },
      runs: { type: Number, default: 0 },
      wickets: { type: Number, default: 0 },
      avg: { type: Number, default: 0 },
      bestPerformance: String
    },
    t20: {
      matches: { type: Number, default: 0 },
      runs: { type: Number, default: 0 },
      wickets: { type: Number, default: 0 },
      avg: { type: Number, default: 0 },
      bestPerformance: String
    }
  },
  
  careerHighs: {
    testScore: Number,
    odiScore: Number,
    t20Score: Number,
    testBestBowling: String,
    odiBestBowling: String,
    t20BestBowling: String
  },
  
  recentForm: [String],
  biography: String,
  profileImage: String,
  
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

// Indexes for faster queries
playerSchema.index({ country: 1, role: 1 });
playerSchema.index({ name: 'text' });

module.exports = mongoose.model('Player', playerSchema);
