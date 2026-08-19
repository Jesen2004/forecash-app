/* product.js pada folder routes ini berfungsi sebagai "JALUR PINTU MASUK API PRODUK" (Express API Route for 
Products) yang menyediakan layanan titik akhir (endpoint) server untuk mengambil data daftar komponen biaya kuliah 
dari database.
Secara awam, file ini bertugas menerima permintaan dari frontend saat aplikasi membutuhkan data produk/kebutuhan 
kuliah (seperti nama item, harga pasar, dan alokasi modal), lalu mengambil seluruh daftar tersebut dari MongoDB 
untuk dikirimkan ke aplikasi.
*/

import express from "express";
import Product from "../models/Product.js";

const router = express.Router();

router.get("/products", async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

export default router;
