const express = require('express');
const router = express.Router();
const pelangganController = require('../controllers/pelangganController');

// Motor
router.get('/motor', pelangganController.lihatDaftarMotor);
router.get('/motor/:id', pelangganController.lihatDetailMotor);

// Transaksi
router.post('/transaksi', pelangganController.buatTransaksiSewa);
router.get('/transaksi/:id_pelanggan', pelangganController.lihatTransaksi);

// Pembayaran
router.post('/pembayaran', pelangganController.melakukanPembayaran);

// Pengembalian
router.post('/pengembalian', pelangganController.kembalikanMotor);

module.exports = router;