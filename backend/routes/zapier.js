// routes/zapier.js
const express = require('express');
const axios = require('axios');
const router = express.Router();
const verifyToken = require('../middleware/auth');

router.post('/trigger', verifyToken, async (req, res) => {
  try {
    const { invoiceId } = req.body;
    const invoice = await Invoice.findById(invoiceId);

    if (!invoice) {
      return res.status(404).json({ msg: 'Invoice not found' });
    }

    await axios.post(process.env.ZAPIER_WEBHOOK_URL, {
      invoiceId: invoice._id,
      amount: invoice.amount,
      dueDate: invoice.dueDate,
      recipient: invoice.recipient,
    });

    res.json({ msg: 'Zapier automation triggered' });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

module.exports = router;
