/* transaction.js pada folder routes ini berfungsi sebagai "JALUR PINTU MASUK API TRANSAKSI" (Express API Route 
for Transactions) yang menyediakan layanan titik akhir (endpoint) server untuk mengambil data riwayat transaksi 
mutasi keuangan dari database.
Secara awam, file ini bertugas menerima permintaan dari frontend saat aplikasi membutuhkan data tabel pencatatan 
transaksi mahasiswa, lalu mengambil daftar transaksi terbaru dari MongoDB dengan batasan jumlah tertentu untuk 
dikirimkan ke aplikasi.
*/

import express from "express";
import Transaction from "../models/Transaction.js";

const router = express.Router();

router.get("/transactions", async (req, res) => {
  try {
    const transactions = await Transaction.find()
      .limit(50)
      .sort({ createdOn: -1 });

    res.status(200).json(transactions);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

export default router;
