const mongoose = require('mongoose');

const matchSchema = new mongoose.Schema({
  title: { type: String, required: true },
  format: { type: String, enum: ['Test', 'ODI', 'T20'], required: true },
  team1: { type: String, required: true },
  team2: { type: String, required: true },
  venue: String,
  startDate: { type: Date, required: true },
  status: { 
    type: String, 
    enum: ['Upcoming', 'Live', 'Completed'],
    default: 'Upcoming'
  },
  
  team1Score: {
    runs: Number,
    wickets: Number,
    overs: String
  },
  team2Score: {
    runs: Number,
    wickets: Number,
    overs: String
  },
  
  toss: String,
  result: String,
  manOfMatch: String,
  
  squads: {
    team1: [String],
    team2: [String]
  },
  
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

// Index for faster queries
matchSchema.index({ status: 1, startDate: -1 });
matchSchema.index({ team1: 1, team2: 1 });

module.exports = mongoose.model('Match', matchSchema);
