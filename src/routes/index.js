const express = require('express');
const router = express.Router();

router.use('/auth', require('./authRoutes'));
router.use('/pelanggan', require('./pelangganRoutes'));
router.use('/admin', require('./adminRoutes'));
router.use('/transaksi', require('./transaksi'));

module.exports = router;
