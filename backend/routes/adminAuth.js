const express = require('express');
const jwt = require('jsonwebtoken');
const Admin = require('../models/Admin');
const router = express.Router();

const JWT_SECRET = process.env.JWT_SECRET || 'cricsphere-secret-key-2024';

// Admin auth middleware (exported for use in other routes)
const authMiddleware = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).json({ error: 'No token provided' });

    const decoded = jwt.verify(token, JWT_SECRET);
    const admin = await Admin.findById(decoded.id);
    if (!admin) return res.status(401).json({ error: 'Admin not found' });

    req.admin = admin;
    next();
  } catch (error) {
    res.status(401).json({ error: 'Invalid or expired token' });
  }
};

// Admin Login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    const admin = await Admin.findOne({ email });
    if (!admin) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const isPasswordValid = await admin.comparePassword(password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    admin.lastLogin = new Date();
    await admin.save();

    const token = jwt.sign({ id: admin._id }, JWT_SECRET, { expiresIn: '7d' });

    res.json({
      message: 'Login successful',
      token,
      admin: { id: admin._id, name: admin.name, email: admin.email, role: admin.role }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Verify admin token
router.post('/verify', async (req, res) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).json({ error: 'No token' });

    const decoded = jwt.verify(token, JWT_SECRET);
    const admin = await Admin.findById(decoded.id);

    if (!admin) return res.status(401).json({ error: 'Admin not found' });

    res.json({ valid: true, admin: { id: admin._id, name: admin.name, role: admin.role } });
  } catch (error) {
    res.status(401).json({ valid: false, error: 'Invalid token' });
  }
});

module.exports = router;
module.exports.authMiddleware = authMiddleware;
