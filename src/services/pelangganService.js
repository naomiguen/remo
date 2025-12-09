const db = require('../config/db');


class PelangganService {
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

    async lihatDetailMotor(id_motor) {
        const query = 'CALL sp_lihat_detail_motor(?)';
        const connection = await db.getConnection();

        try {
            const [rows] = await connection.execute(query, [id_motor]);
            return { success: true, data: rows[0] };
        } catch (error) {
            return { success: false, error: error.message };
        } finally {
            connection.release();
        }
    }

    async buatTransaksiSewa(data) {
        const { id_pelanggan, id_motor, tanggal_sewa, tanggal_rencana_kembali } = data;

        const callQuery = `
            CALL sp_buat_transaksi_sewa(?, ?, ?, ?, @id_transaksi, @message)
        `;
        const selectQuery = `
            SELECT @id_transaksi AS id_transaksi, @message AS message
        `;

        const conn = await db.getConnection();

        try {
            await conn.execute(callQuery, [
                id_pelanggan,
                id_motor,
                tanggal_sewa,
                tanggal_rencana_kembali
            ]);

            const [rows] = await conn.execute(selectQuery);
            const result = rows[0];

            if (result.id_transaksi === null) {
                return {
                    success: false,
                    message: result.message
                };
            }

            return {
                success: true,
                data: result
            };

        } catch (error) {
            return { success: false, message: error.message };
        } finally {
            conn.release();
        }
    }


    async melakukanPembayaran(data) {
        const { id_transaksi, jumlah, metode } = data;
        
        const query = 'CALL sp_melakukan_pembayaran(?, ?, ?, @id_pembayaran, @message)';
        const selectQuery = 'SELECT @id_pembayaran AS id_pembayaran, @message AS message';
        
        const connection = await db.getConnection();
        
        try {
            await connection.execute(query, [id_transaksi, jumlah, metode]);
            const [result] = await connection.execute(selectQuery);
            return { success: true, data: result[0] };
        } catch (error) {
            return { success: false, error: error.message };
        } finally {
            connection.release();
        }
    }

    async kembalikanMotor(data) {
        const { id_transaksi, tanggal_kembali } = data;
        
        const query = 'CALL sp_kembalikan_motor(?, ?, @denda, @total_akhir, @message)';
        const selectQuery = 'SELECT @denda AS denda, @total_akhir AS total_akhir, @message AS message';
        
        const connection = await db.getConnection();
        
        try {
            await connection.execute(query, [id_transaksi, tanggal_kembali]);
            const [result] = await connection.execute(selectQuery);
            return { success: true, data: result[0] };
        } catch (error) {
            return { success: false, error: error.message };
        } finally {
            connection.release();
        }
    }

    async lihatTransaksi(idPelanggan, status = null) {
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
}

module.exports = new PelangganService();


