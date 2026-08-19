/* Product.js pada folder models ini berfungsi sebagai "SKEMA MODEL DATABASE PRODUK/BIAYA" (Mongoose Product Schema)
yang menentukan struktur penyimpanan data barang dan komponen biaya perkuliahan di server Backend (MongoDB).
Secara awam, file ini bertugas sebagai aturan cetak biru (blueprint) di database untuk mengatur cara menyimpan ID 
produk kustom, harga nominal pasar, alokasi modal pengeluaran, serta hubungan relasinya dengan transaksi.
*/

import mongoose from "mongoose";
import { loadType } from "mongoose-currency";

const Schema = mongoose.Schema;
loadType(mongoose);

const ProductSchema = new Schema(
  {
    _id: {
      type: String,
      required: true,
    },
    price: {
      type: mongoose.Types.Currency,
      currency: "USD",
      get: (v) => v / 100,
    },
    expense: {
      type: mongoose.Types.Currency,
      currency: "USD",
      get: (v) => v / 100,
    },
    transactions: [
      {
        type: String,
        ref: "Transaction",
      },
    ],
  },
  { timestamps: true, toJSON: { getters: true } },
);

const Product = mongoose.model("Product", ProductSchema);

export default Product;
