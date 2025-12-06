const authService = require('../services/authService');
const { successResponse, errorResponse } = require('../utils/response');
class AuthController {
    async register(req, res) {
        try {
            const { nama, no_ktp, alamat, no_handphone, username, password } = req.body;
            
            if (!nama || !no_ktp || !username || !password) {
                return errorResponse(res, 400, 'Data tidak lengkap');
            }
            
            const result = await authService.registrasiPelanggan({
                nama, no_ktp, alamat, no_handphone, username, password
            });
            
            if (!result.success) {
                return errorResponse(res, 400, 'Registrasi gagal', result.error);
            }
            
            return successResponse(res, 201, result.data.message, {
                id_pelanggan: result.data.id_pelanggan
            });
        } catch (error) {
            return errorResponse(res, 500, 'Internal server error', error.message);
        }
    }

    async loginPelanggan(req, res) {
        try {
            const { username, password } = req.body;
            
            if (!username || !password) {
                return errorResponse(res, 400, 'Username dan password harus diisi');
            }
            
            const result = await authService.loginPelanggan(username, password);
            
            if (!result.success) {
                return errorResponse(res, 400, 'Login gagal', result.error);
            }
            
            const { id_pelanggan, nama, message } = result.data;
            
            if (!id_pelanggan) {
                return errorResponse(res, 401, message);
            }
            
            return successResponse(res, 200, message, {
                id_pelanggan, nama, role: 'pelanggan'
            });
        } catch (error) {
            return errorResponse(res, 500, 'Internal server error', error.message);
        }
    }

    async loginAdmin(req, res) {
        try {
            const { username, password } = req.body;
            
            if (!username || !password) {
                return errorResponse(res, 400, 'Username dan password harus diisi');
            }
            
            const result = await authService.loginAdmin(username, password);
            
            if (!result.success) {
                return errorResponse(res, 400, 'Login gagal', result.error);
            }
            
            const { id_admin, nama, message } = result.data;
            
            if (!id_admin) {
                return errorResponse(res, 401, message);
            }
            
            return successResponse(res, 200, message, {
                id_admin, nama, role: 'admin'
            });
        } catch (error) {
            return errorResponse(res, 500, 'Internal server error', error.message);
        }
    }
}

module.exports = new AuthController();