const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const adminSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, unique: true, required: true, lowercase: true },
  password: { type: String, required: true },
  
  role: {
    type: String,
    enum: ['super_admin', 'admin', 'editor'],
    default: 'admin'
  },
  
  permissions: {
    manageMatches: { type: Boolean, default: true },
    managePlayers: { type: Boolean, default: true },
    manageNews: { type: Boolean, default: true },
    manageAdmins: { type: Boolean, default: false },
    viewAnalytics: { type: Boolean, default: true }
  },
  
  avatar: String,
  bio: String,
  
  lastLogin: Date,
  isActive: { type: Boolean, default: true },
  
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

// Hash password before saving
adminSchema.pre('save', async function(next) {
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
adminSchema.methods.comparePassword = async function(password) {
  return await bcrypt.compare(password, this.password);
};

// Check permission method
adminSchema.methods.hasPermission = function(permission) {
  return this.permissions[permission] || false;
};

// Admin role check
adminSchema.methods.isSuperAdmin = function() {
  return this.role === 'super_admin';
};

module.exports = mongoose.model('Admin', adminSchema);
