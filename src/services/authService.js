const db = require('../config/db');
const bcrypt = require('bcrypt');

class AuthService {
    async registrasiPelanggan(data) {
        const { nama, no_ktp, alamat, no_handphone, username, password } = data;
        
        const connection = await db.getConnection();
        
        try {
            // Hash password dengan bcrypt
            const hashedPassword = await bcrypt.hash(password, 10);
            
            const query = 'CALL sp_registrasi_pelanggan(?, ?, ?, ?, ?, ?, @id_pelanggan, @message)';
            const selectQuery = 'SELECT @id_pelanggan AS id_pelanggan, @message AS message';
            
            await connection.execute(query, [
                nama, no_ktp, alamat, no_handphone, username, hashedPassword
            ]);
            
            const [result] = await connection.execute(selectQuery);
            
            return { success: true, data: result[0] };
        } catch (error) {
            return { success: false, error: error.message };
        } finally {
            connection.release();
        }
    }

    
    async loginPelanggan(username, password) {
        const query = 'CALL sp_get_pelanggan_hash(?, @id, @nama, @hash, @msg)';
        const selectQuery = 'SELECT @id AS id_pelanggan, @nama AS nama, @hash AS password_hash, @msg AS message';
        
        const connection = await db.getConnection();
        
        try {
            // Panggil stored procedure untuk ambil hash
            await connection.execute(query, [username]);
            const [result] = await connection.execute(selectQuery);
            
            const { id_pelanggan, nama, password_hash, message } = result[0];
            
            // Jika username tidak ditemukan
            if (!id_pelanggan) {
                return { 
                    success: true, 
                    data: { 
                        id_pelanggan: null, 
                        nama: null,
                        message: 'Username atau password salah' 
                    } 
                };
            }
            
            // Verify password dengan bcrypt
            const isPasswordValid = await bcrypt.compare(password, password_hash);
            
            if (!isPasswordValid) {
                return { 
                    success: true, 
                    data: { 
                        id_pelanggan: null, 
                        nama: null,
                        message: 'Username atau password salah' 
                    } 
                };
            }
            
            // Password benar
            return { 
                success: true, 
                data: { 
                    id_pelanggan, 
                    nama, 
                    message: 'Login berhasil' 
                } 
            };
        } catch (error) {
            return { success: false, error: error.message };
        } finally {
            connection.release();
        }
    }

    
    async loginAdmin(username, password) {
        const query = 'CALL sp_get_admin_hash(?, @id, @nama, @hash, @msg)';
        const selectQuery = 'SELECT @id AS id_admin, @nama AS nama, @hash AS password_hash, @msg AS message';
        
        const connection = await db.getConnection();
        
        try {
            // Panggil stored procedure untuk ambil hash
            await connection.execute(query, [username]);
            const [result] = await connection.execute(selectQuery);
            
            const { id_admin, nama, password_hash, message } = result[0];
            
            // Jika username tidak ditemukan
            if (!id_admin) {
                return { 
                    success: true, 
                    data: { 
                        id_admin: null, 
                        nama: null,
                        message: 'Username atau password salah' 
                    } 
                };
            }
            
            // Verify password dengan bcrypt
            const isPasswordValid = await bcrypt.compare(password, password_hash);
            
            if (!isPasswordValid) {
                return { 
                    success: true, 
                    data: { 
                        id_admin: null, 
                        nama: null,
                        message: 'Username atau password salah' 
                    } 
                };
            }
            
            
            return { 
                success: true, 
                data: { 
                    id_admin, 
                    nama, 
                    message: 'Login berhasil' 
                } 
            };
        } catch (error) {
            return { success: false, error: error.message };
        } finally {
            connection.release();
        }
    }
}

module.exports = new AuthService();