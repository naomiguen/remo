const express = require('express');
const app = express();

// Middleware untuk parsing JSON
app.use(express.json());

// Import router transaksi
const transaksiRoutes = require('./src/routes/transaksi');

// Pakai router pada prefix /transaksi
app.use('/transaksi', transaksiRoutes);

// Listen server
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
