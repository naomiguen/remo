const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

router.post('/register', authController.register);
router.post('/login/pelanggan', authController.loginPelanggan);
router.post('/login/admin', authController.loginAdmin);

module.exports = router;