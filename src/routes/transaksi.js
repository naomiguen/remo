const express = require('express');
const router = express.Router();
const db = require('../config/db');

router.get('/test', (req, res) => {
    res.json({ message: "Router transaksi aktif" });
});

router.get('/db-test', async (req, res) => {
    try {
        const [rows] = await db.query("SELECT 1");
        res.json({ db: "Connected", result: rows });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
