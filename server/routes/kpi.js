/* kpi.js pada folder routes ini berfungsi sebagai "JALUR PINTU MASUK API KPI" (Express API Route for KPI) yang 
menyediakan layanan titik akhir (endpoint) server untuk mengambil data indikator kinerja utama (Key Performance 
Indicators) dari database.
Secara awam, file ini bertugas menerima permintaan dari frontend saat aplikasi meminta data grafik makro (seperti 
total pendapatan, total pengeluaran, dan tren bulanan), lalu mengambil data tersebut dari MongoDB untuk dikirimkan 
kembali ke aplikasi.
*/

import express from "express";
import KPI from "../models/KPI.js";

const router = express.Router();

router.get("/kpis", async (req, res) => {
  try {
    const kpis = await KPI.find();
    res.status(200).json(kpis);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

export default router;
