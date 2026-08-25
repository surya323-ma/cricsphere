const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, unique: true, required: true, lowercase: true },
  password: { type: String, required: true },
  avatar: String,
  bio: String,
  
  favoriteTeam: String,
  preferredFormat: { type: String, enum: ['Test', 'ODI', 'T20', 'All'], default: 'All' },
  
  followers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  following: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  watchlist: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Match' }],
  likedNews: [{ type: mongoose.Schema.Types.ObjectId, ref: 'News' }],
  
  totalMatchesWatched: { type: Number, default: 0 },
  totalNewsRead: { type: Number, default: 0 },
  lastLogin: Date,
  isActive: { type: Boolean, default: true },
  
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

// Hash password before saving
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Compare password method
userSchema.methods.comparePassword = async function(password) {
  return await bcrypt.compare(password, this.password);
};

module.exports = mongoose.model('User', userSchema);
