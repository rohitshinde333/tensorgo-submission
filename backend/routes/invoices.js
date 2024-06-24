// routes/invoices.js
const express = require('express');
const router = express.Router();
const Invoice = require('../models/Invoice');

// Middleware to verify JWT
const verifyToken = require('../middleware/auth');

// Get due invoices
router.get('/', verifyToken, async (req, res) => {
  try {
    const invoices = await Invoice.find({ user: req.user.id, dueDate: { $lt: new Date() } });
    res.json(invoices);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

module.exports = router;
