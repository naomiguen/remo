const pelangganService = require('../services/pelangganService');
const { successResponse, errorResponse } = require('../utils/response');

class PelangganController {
    /**
     * GET /api/pelanggan/motor
     * GET /api/pelanggan/motor?status=tersedia
     */
    async lihatDaftarMotor(req, res) {
        try {
            const { status } = req.query;
            
            const result = await pelangganService.lihatDaftarMotor(status || null);
            
            if (!result.success) {
                return errorResponse(res, 400, 'Gagal mengambil data motor', result.error);
            }
            
            return successResponse(res, 200, 'Data motor berhasil diambil', result.data);
        } catch (error) {
            return errorResponse(res, 500, 'Internal server error', error.message);
        }
    }

    /**
     * GET /api/pelanggan/motor/:id
     */
    async lihatDetailMotor(req, res) {
        try {
            const { id } = req.params;
            
            if (!id) {
                return errorResponse(res, 400, 'ID motor harus diisi');
            }
            
            const result = await pelangganService.lihatDetailMotor(id);
            
            if (!result.success) {
                return errorResponse(res, 400, 'Gagal mengambil detail motor', result.error);
            }
            
            if (result.data.length === 0) {
                return errorResponse(res, 404, 'Motor tidak ditemukan');
            }
            
            return successResponse(res, 200, 'Detail motor berhasil diambil', result.data[0]);
        } catch (error) {
            return errorResponse(res, 500, 'Internal server error', error.message);
        }
    }

    /**
     * POST /api/pelanggan/transaksi
     */
    async buatTransaksiSewa(req, res) {
        try {
            const { id_pelanggan, id_motor, tanggal_sewa, tanggal_rencana_kembali } = req.body;
            
            if (!id_pelanggan || !id_motor || !tanggal_sewa || !tanggal_rencana_kembali) {
                return errorResponse(res, 400, 'Data tidak lengkap');
            }
            
            const result = await pelangganService.buatTransaksiSewa({
                id_pelanggan,
                id_motor,
                tanggal_sewa,
                tanggal_rencana_kembali
            });
            
            if (!result.success) {
                return errorResponse(res, 400, 'Gagal membuat transaksi', result.error);
            }
            
            return successResponse(res, 201, result.data.message, {
                id_transaksi: result.data.id_transaksi
            });
        } catch (error) {
            return errorResponse(res, 500, 'Internal server error', error.message);
        }
    }

    /**
     * POST /api/pelanggan/pembayaran
     */
    async melakukanPembayaran(req, res) {
        try {
            const { id_transaksi, jumlah, metode } = req.body;
            
            if (!id_transaksi || !jumlah || !metode) {
                return errorResponse(res, 400, 'Data tidak lengkap');
            }
            
            const result = await pelangganService.melakukanPembayaran({
                id_transaksi,
                jumlah,
                metode
            });
            
            if (!result.success) {
                return errorResponse(res, 400, 'Gagal melakukan pembayaran', result.error);
            }
            
            return successResponse(res, 201, result.data.message, {
                id_pembayaran: result.data.id_pembayaran
            });
        } catch (error) {
            return errorResponse(res, 500, 'Internal server error', error.message);
        }
    }

    /**
     * POST /api/pelanggan/pengembalian
     */
    async kembalikanMotor(req, res) {
        try {
            const { id_transaksi, tanggal_kembali } = req.body;
            
            if (!id_transaksi || !tanggal_kembali) {
                return errorResponse(res, 400, 'Data tidak lengkap');
            }
            
            const result = await pelangganService.kembalikanMotor({
                id_transaksi,
                tanggal_kembali
            });
            
            if (!result.success) {
                return errorResponse(res, 400, 'Gagal mengembalikan motor', result.error);
            }
            
            return successResponse(res, 200, result.data.message, {
                denda: result.data.denda,
                total_akhir: result.data.total_akhir
            });
        } catch (error) {
            return errorResponse(res, 500, 'Internal server error', error.message);
        }
    }

    /**
     * GET /api/pelanggan/transaksi/:id_pelanggan
     * GET /api/pelanggan/transaksi/:id_pelanggan?status=selesai
     */
    async lihatTransaksi(req, res) {
        try {
            const { id_pelanggan } = req.params;
            const { status } = req.query;
            
            if (!id_pelanggan) {
                return errorResponse(res, 400, 'ID pelanggan harus diisi');
            }
            
            const result = await pelangganService.lihatTransaksi(id_pelanggan, status || null);
            
            if (!result.success) {
                return errorResponse(res, 400, 'Gagal mengambil data transaksi', result.error);
            }
            
            return successResponse(res, 200, 'Data transaksi berhasil diambil', result.data);
        } catch (error) {
            return errorResponse(res, 500, 'Internal server error', error.message);
        }
    }
}

module.exports = new PelangganController();