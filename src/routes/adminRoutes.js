const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');

// Motor Management
router.get('/motor', adminController.lihatDaftarMotor);
router.post('/motor', adminController.tambahMotor);
router.get('/motor/deleted', adminController.lihatMotorDihapus); 
router.get('/motor/:id', adminController.lihatDetailMotor);
router.put('/motor/:id', adminController.updateMotor);
router.delete('/motor/:id', adminController.hapusMotor);
router.delete('/motor/:id/paksa', adminController.hapusMotorPaksa);
router.put('/motor/restore/:id', adminController.restoreMotor); 
router.post('/motor/riwayat', adminController.tambahRiwayatMotor);

// Pembayaran Management
router.get('/pembayaran', adminController.lihatPembayaran);
router.post('/pembayaran', adminController.inputDataPembayaran);
router.put('/pembayaran/verifikasi/:id', adminController.verifikasiPembayaran);

// Transaksi Management
router.get('/transaksi', adminController.lihatTransaksi);
router.put('/transaksi/selesai/:id', adminController.selesaikanTransaksi);

// Laporan
router.get('/laporan', adminController.lihatLaporanRental);


module.exports = router;