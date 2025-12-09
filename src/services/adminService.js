const db = require('../config/db');

class AdminService {
    async tambahMotor(data) {
        const { plat_motor, merk, tipe, tarif_harian, status } = data;
        
        const query = 'CALL sp_tambah_motor(?, ?, ?, ?, ?, @id_motor, @message)';
        const selectQuery = 'SELECT @id_motor AS id_motor, @message AS message';
        
        const connection = await db.getConnection();
        
        try {
            await connection.execute(query, [
                plat_motor,
                merk,
                tipe,
                tarif_harian,
                status
            ]);
            
            const [result] = await connection.execute(selectQuery);
            return { success: true, data: result[0] };
        } catch (error) {
            return { success: false, error: error.message };
        } finally {
            connection.release();
        }
    }

    
    async updateMotor(data) {
        const { id_motor, plat_motor, merk, tipe, tarif_harian, status } = data;
        
        const query = 'CALL sp_update_motor(?, ?, ?, ?, ?, ?, @message)';
        const selectQuery = 'SELECT @message AS message';
        
        const connection = await db.getConnection();
        
        try {
            await connection.execute(query, [
                id_motor, plat_motor, merk, tipe, tarif_harian, status
            ]);
            
            const [result] = await connection.execute(selectQuery);
            const message = result[0]?.message;

            if (!message) {
                return { success: false, error: 'Gagal mendapatkan response dari database' };
            }

            if (message.startsWith('Error:')) {
                return { success: false, error: message };
            }

            return { success: true, data: { message: message } };
        } catch (error) {
            return { success: false, error: error.message };
        } finally {
            connection.release();
        }
    }

    
    async hapusMotor(idMotor) {
        const query = 'CALL sp_hapus_motor(?, @message)';
        const selectQuery = 'SELECT @message AS message';
            
        const connection = await db.getConnection();
        
        try {
            await connection.execute(query, [idMotor]);
            const [result] = await connection.execute(selectQuery);
            
            const message = result[0]?.message;
            
            if (!message) {
                return { success: false, error: 'Gagal mendapatkan response dari database' };
            }
            
            if (message.startsWith('Error:')) {
                return { success: false, error: message };
            }
            
            return { success: true, data: { message: message } };
            
        } catch (error) {
            return { success: false, error: error.message };
        } finally {
            connection.release();
        }
    }

    async hapusMotorPaksa(idMotor) {
        const query = 'CALL sp_hapus_motor_paksa(?, @message)';
        const selectQuery = 'SELECT @message AS message';
            
        const connection = await db.getConnection();
        
        try {
            await connection.execute(query, [idMotor]);
            const [result] = await connection.execute(selectQuery);
            
            const message = result[0]?.message;
            
            if (!message) {
                return { success: false, error: 'Gagal mendapatkan response dari database' };
            }
            
            if (message.startsWith('Error:')) {
                return { success: false, error: message };
            }
            
            return { success: true, data: { message: message } };
            
        } catch (error) {
            return { success: false, error: error.message };
        } finally {
            connection.release();
        }
    }

    
    async restoreMotor(idMotor) {
        const query = 'CALL sp_restore_motor(?, @message)';
        const selectQuery = 'SELECT @message AS message';
            
        const connection = await db.getConnection();
        
        try {
            await connection.execute(query, [idMotor]);
            const [result] = await connection.execute(selectQuery);
            
            const message = result[0]?.message;
            
            if (!message) {
                return { success: false, error: 'Gagal mendapatkan response dari database' };
            }
            
            if (message.startsWith('Error:')) {
                return { success: false, error: message };
            }
            
            return { success: true, data: { message: message } };
            
        } catch (error) {
            return { success: false, error: error.message };
        } finally {
            connection.release();
        }
    }

    
    async lihatMotorDihapus() {
        const query = 'CALL sp_lihat_motor_dihapus()';
        const connection = await db.getConnection();
        
        try {
            const [rows] = await connection.execute(query);
            return { success: true, data: rows[0] };
        } catch (error) {
            return { success: false, error: error.message };
        } finally {
            connection.release();
        }
    }


    async tambahRiwayatMotor(data) {
        const { id_motor, status, keterangan } = data;
        
        const query = 'CALL sp_tambah_riwayat_motor(?, ?, ?, @id_riwayat, @message)';
        const selectQuery = 'SELECT @id_riwayat AS id_riwayat, @message AS message';
        
        const connection = await db.getConnection();
        
        try {
            await connection.execute(query, [id_motor, status, keterangan]);
            const [result] = await connection.execute(selectQuery);
            return { success: true, data: result[0] };
        } catch (error) {
            return { success: false, error: error.message };
        } finally {
            connection.release();
        }
    }

    
    async verifikasiPembayaran(data) {
        const { id_pembayaran, id_admin, status_verifikasi } = data;
        
        const query = 'CALL sp_verifikasi_pembayaran(?, ?, ?, @message)';
        const selectQuery = 'SELECT @message AS message';
        
        const connection = await db.getConnection();
        
        try {
            await connection.execute(query, [id_pembayaran, id_admin, status_verifikasi]);
            const [result] = await connection.execute(selectQuery);
            return { success: true, data: result[0] };
        } catch (error) {
            return { success: false, error: error.message };
        } finally {
            connection.release();
        }
    }

    
    async inputDataPembayaran(data) {
        const { id_transaksi, id_admin, jumlah, metode, status } = data;
        
        const query = 'CALL sp_input_data_pembayaran(?, ?, ?, ?, ?, @id_pembayaran, @message)';
        const selectQuery = 'SELECT @id_pembayaran AS id_pembayaran, @message AS message';
        
        const connection = await db.getConnection();
        
        try {
            await connection.execute(query, [
                id_transaksi,
                id_admin,
                jumlah,
                metode,
                status
            ]);
            
            const [result] = await connection.execute(selectQuery);
            return { success: true, data: result[0] };
        } catch (error) {
            return { success: false, error: error.message };
        } finally {
            connection.release();
        }
    }

    
    async selesaikanTransaksi(data) {
        const { id_transaksi, id_admin } = data;
        
        const query = 'CALL sp_selesaikan_transaksi(?, ?, @message)';
        const selectQuery = 'SELECT @message AS message';
        
        const connection = await db.getConnection();
        
        try {
            await connection.execute(query, [id_transaksi, id_admin]);
            const [result] = await connection.execute(selectQuery);
            return { success: true, data: result[0] };
        } catch (error) {
            return { success: false, error: error.message };
        } finally {
            connection.release();
        }
    }

    
    async lihatLaporanRental(tanggalMulai, tanggalAkhir) {
        const query = 'CALL sp_lihat_laporan_rental(?, ?)';
        const connection = await db.getConnection();
        
        try {
            const [rows] = await connection.execute(query, [tanggalMulai, tanggalAkhir]);
            return { success: true, data: rows[0] };
        } catch (error) {
            return { success: false, error: error.message };
        } finally {
            connection.release();
        }
    }

    
    async lihatTransaksi(idPelanggan = null, status = null) {
        const query = 'CALL sp_lihat_transaksi(?, ?)';
        const connection = await db.getConnection();
        
        try {
            const [rows] = await connection.execute(query, [idPelanggan, status]);
            return { success: true, data: rows[0] };
        } catch (error) {
            return { success: false, error: error.message };
        } finally {
            connection.release();
        }
    }

    
    async lihatPembayaran(idTransaksi = null, status = null) {
        const query = 'CALL sp_lihat_pembayaran(?, ?)';
        const connection = await db.getConnection();
        
        try {
            const [rows] = await connection.execute(query, [idTransaksi, status]);
            return { success: true, data: rows[0] };
        } catch (error) {
            return { success: false, error: error.message };
        } finally {
            connection.release();
        }
    }

    
    async lihatDaftarMotor(status = null) {
        const query = 'CALL sp_lihat_daftar_motor(?)';
        const connection = await db.getConnection();
        
        try {
            const [rows] = await connection.execute(query, [status]);
            return { success: true, data: rows[0] };
        } catch (error) {
            return { success: false, error: error.message };
        } finally {
            connection.release();
        }
    }


    async lihatDetailMotor(idMotor) {
        const query = 'CALL sp_lihat_detail_motor(?)';
        const connection = await db.getConnection();
        
        try {
            const [rows] = await connection.execute(query, [idMotor]);
            return { success: true, data: rows[0] };
        } catch (error) {
            return { success: false, error: error.message };
        } finally {
            connection.release();
        }
    }
}

module.exports = new AdminService();