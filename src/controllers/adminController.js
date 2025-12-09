const adminService = require('../services/adminService');
const { successResponse, errorResponse } = require('../utils/response');

function validID(id) {
    return !isNaN(id) && Number(id) > 0;
}


class AdminController {
    /**
     * POST /api/admin/motor
     * Tambah Motor Baru
     */
    async tambahMotor(req, res) {
        try {
            const { plat_motor, merk, tipe, tarif_harian, status } = req.body;

            if (!plat_motor || !merk || !tarif_harian || !status) {
                return errorResponse(res, 400, 'Data tidak lengkap');
            }

            const result = await adminService.tambahMotor({ plat_motor, merk, tipe, tarif_harian, status });

            if (!result.success) {
                return errorResponse(res, 400, result.error || 'Gagal menambah motor');
            }

            return successResponse(res, 201, result.data.message, {
                id_motor: result.data.id_motor,
            });

        } catch (error) {
            return errorResponse(res, 500, 'Internal server error', error.message);
        }
    }

    /**
     * PUT /api/admin/motor/:id
     * Update Motor
     */
    async updateMotor(req, res) {
        try {
            const { id } = req.params;

            if (!validID(id)) {
                return errorResponse(res, 400, 'ID motor tidak valid');
            }

            const { plat_motor, merk, tipe, tarif_harian, status } = req.body;

            if (!plat_motor || !merk || !tarif_harian || !status) {
                return errorResponse(res, 400, 'Data tidak lengkap');
            }

            const result = await adminService.updateMotor({
                id_motor: id,
                plat_motor,
                merk,
                tipe,
                tarif_harian,
                status,
            });

            if (!result.success) {
                return errorResponse(res, 400, result.error || 'Gagal mengupdate motor');
            }

            return successResponse(res, 200, result.data.message);

        } catch (error) {
            return errorResponse(res, 500, 'Internal server error', error.message);
        }
    }

    /**
     * DELETE /api/admin/motor/:id
     * Hapus Motor
     */
    async hapusMotor(req, res) {
        try {
            const { id } = req.params;

            if (!validID(id)) {
                return errorResponse(res, 400, 'ID motor tidak valid');
            }

            const result = await adminService.hapusMotor(id);

            if (!result.success) {
                return errorResponse(res, 400, result.error || 'Gagal menghapus motor');
            }

            return successResponse(res, 200, result.data.message);

        } catch (error) {
            return errorResponse(res, 500, 'Internal server error', error.message);
        }
    }

    /**
     * PUT /api/admin/motor/restore/:id
     * Restore Motor yang Dihapus
     */
    async restoreMotor(req, res) {
        try {
            const { id } = req.params;

            if (!validID(id)) {
                return errorResponse(res, 400, 'ID motor tidak valid');
            }

            const result = await adminService.restoreMotor(id);

            if (!result.success) {
                return errorResponse(res, 400, result.error || 'Gagal restore motor');
            }

            return successResponse(res, 200, result.data.message);

        } catch (error) {
            return errorResponse(res, 500, 'Internal server error', error.message);
        }
    }

    /**
     * GET /api/admin/motor/deleted
     * Lihat Daftar Motor yang Dihapus
     */
   async lihatMotorDihapus(req, res) {
        try {
            const result = await adminService.lihatMotorDihapus();

            if (!result.success) {
                return errorResponse(res, 400, result.error || 'Gagal mengambil data motor yang dihapus');
            }

            return successResponse(res, 200, 'Data motor yang dihapus berhasil diambil', result.data);

        } catch (error) {
            return errorResponse(res, 500, 'Internal server error', error.message);
        }
    }

    /**
     * POST /api/admin/motor/riwayat
     * Tambah Riwayat Motor
     */
    async tambahRiwayatMotor(req, res) {
        try {
            const { id_motor, status, keterangan } = req.body;

            if (!validID(id_motor) || !status) {
                return errorResponse(res, 400, 'Data tidak lengkap');
            }

            const result = await adminService.tambahRiwayatMotor({ id_motor, status, keterangan });

            if (!result.success) {
                return errorResponse(res, 400, result.error || 'Gagal menambah riwayat motor');
            }

            return successResponse(res, 201, result.data.message, {
                id_riwayat: result.data.id_riwayat,
            });

        } catch (error) {
            return errorResponse(res, 500, 'Internal server error', error.message);
        }
    }

    /**
     * PUT /api/admin/pembayaran/verifikasi/:id
     * Verifikasi Pembayaran
     */
    async verifikasiPembayaran(req, res) {
        try {
            const { id } = req.params;
            const { id_admin, status_verifikasi } = req.body;
            
            if (!id || !id_admin || !status_verifikasi) {
                return errorResponse(res, 400, 'Data tidak lengkap');
            }
            
            const result = await adminService.verifikasiPembayaran({
                id_pembayaran: id,
                id_admin,
                status_verifikasi
            });
            
            if (!result.success) {
                return errorResponse(res, 400, 'Gagal verifikasi pembayaran', result.error);
            }
            
            return successResponse(res, 200, result.data.message);
        } catch (error) {
            return errorResponse(res, 500, 'Internal server error', error.message);
        }
    }

    /**
     * POST /api/admin/pembayaran
     * Input Data Pembayaran (Offline)
     */
    async inputDataPembayaran(req, res) {
        try {
            const { id_transaksi, id_admin, jumlah, metode, status } = req.body;
            
            if (!id_transaksi || !id_admin || !jumlah || !metode || !status) {
                return errorResponse(res, 400, 'Data tidak lengkap');
            }
            
            const result = await adminService.inputDataPembayaran({
                id_transaksi, id_admin, jumlah, metode, status
            });
            
            if (!result.success) {
                return errorResponse(res, 400, 'Gagal input pembayaran', result.error);
            }
            
            return successResponse(res, 201, result.data.message, {
                id_pembayaran: result.data.id_pembayaran
            });
        } catch (error) {
            return errorResponse(res, 500, 'Internal server error', error.message);
        }
    }

    /**
     * PUT /api/admin/transaksi/selesai/:id
     * Selesaikan Transaksi
     */
    async selesaikanTransaksi(req, res) {
        try {
            const { id } = req.params;
            const { id_admin } = req.body;
            
            if (!id || !id_admin) {
                return errorResponse(res, 400, 'Data tidak lengkap');
            }
            
            const result = await adminService.selesaikanTransaksi({
                id_transaksi: id,
                id_admin
            });
            
            if (!result.success) {
                return errorResponse(res, 400, 'Gagal menyelesaikan transaksi', result.error);
            }
            
            return successResponse(res, 200, result.data.message);
        } catch (error) {
            return errorResponse(res, 500, 'Internal server error', error.message);
        }
    }

    /**
     * GET /api/admin/laporan
     * Lihat Laporan Rental
     */
    async lihatLaporanRental(req, res) {
        try {
            const { tanggal_mulai, tanggal_akhir } = req.query;
            
            if (!tanggal_mulai || !tanggal_akhir) {
                return errorResponse(res, 400, 'Tanggal mulai dan akhir harus diisi');
            }
            
            const result = await adminService.lihatLaporanRental(tanggal_mulai, tanggal_akhir);
            
            if (!result.success) {
                return errorResponse(res, 400, 'Gagal mengambil laporan', result.error);
            }
            
            return successResponse(res, 200, 'Laporan berhasil diambil', result.data);
        } catch (error) {
            return errorResponse(res, 500, 'Internal server error', error.message);
        }
    }

    /**
     * GET /api/admin/transaksi
     * Lihat Semua Transaksi
     */
    async lihatTransaksi(req, res) {
        try {
            const { id_pelanggan, status } = req.query;
            
            const result = await adminService.lihatTransaksi(
                id_pelanggan || null,
                status || null
            );
            
            if (!result.success) {
                return errorResponse(res, 400, 'Gagal mengambil data transaksi', result.error);
            }
            
            return successResponse(res, 200, 'Data transaksi berhasil diambil', result.data);
        } catch (error) {
            return errorResponse(res, 500, 'Internal server error', error.message);
        }
    }

    /**
     * GET /api/admin/pembayaran
     * Lihat Semua Pembayaran
     */
    async lihatPembayaran(req, res) {
        try {
            const { id_transaksi, status } = req.query;
            
            const result = await adminService.lihatPembayaran(
                id_transaksi || null,
                status || null
            );
            
            if (!result.success) {
                return errorResponse(res, 400, 'Gagal mengambil data pembayaran', result.error);
            }
            
            return successResponse(res, 200, 'Data pembayaran berhasil diambil', result.data);
        } catch (error) {
            return errorResponse(res, 500, 'Internal server error', error.message);
        }
    }

    /**
     * GET /api/admin/motor
     * Lihat Daftar Motor
     */
    async lihatDaftarMotor(req, res) {
        try {
            const { status } = req.query;
            
            const result = await adminService.lihatDaftarMotor(status || null);
            
            if (!result.success) {
                return errorResponse(res, 400, 'Gagal mengambil data motor', result.error);
            }
            
            return successResponse(res, 200, 'Data motor berhasil diambil', result.data);
        } catch (error) {
            return errorResponse(res, 500, 'Internal server error', error.message);
        }
    }

    /**
     * GET /api/admin/motor/:id
     * Lihat Detail Motor
     */
    async lihatDetailMotor(req, res) {
        try {
            const { id } = req.params;
            
            if (!id) {
                return errorResponse(res, 400, 'ID motor harus diisi');
            }
            
            const result = await adminService.lihatDetailMotor(id);
            
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


    async hapusMotorPaksa(req, res) {
        try {
            const { id } = req.params;

            if (!validID(id)) {
                return errorResponse(res, 400, 'ID motor tidak valid');
            }

            const result = await adminService.hapusMotorPaksa(id);

            if (!result.success) {
                return errorResponse(res, 400, result.error || 'Gagal menghapus motor');
            }

            return successResponse(res, 200, result.data.message);

        } catch (error) {
            return errorResponse(res, 500, 'Internal server error', error.message);
        }
    }
}

module.exports = new AdminController();