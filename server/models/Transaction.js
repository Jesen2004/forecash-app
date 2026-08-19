/* Transaction.js pada folder models ini berfungsi sebagai "SKEMA MODEL DATABASE TRANSAKSI" (Mongoose Transaction 
Schema) yang menentukan struktur penyimpanan log riwayat pencatatan transaksi mutasi keuangan di server Backend 
(MongoDB).
Secara awam, file ini bertugas sebagai cetak biru (blueprint) di database untuk mengatur cara menyimpan ID 
transaksi (NIM/kode unik), identitas responden mahasiswa, total nominal transaksi, serta daftar produk biaya yang 
dibeli.
*/

import mongoose from "mongoose";
import { loadType } from "mongoose-currency";

const Schema = mongoose.Schema;
loadType(mongoose);

const TransactionSchema = new Schema(
  {
    _id: {
      type: String,
      required: true,
    },
    buyer: {
      type: String,
      required: true,
    },
    amount: {
      type: mongoose.Types.Currency,
      currency: "USD",
      get: (v) => v / 100,
    },
    productIds: [
      {
        type: String,
        ref: "Product",
      },
    ],
  },
  { timestamps: true, toJSON: { getters: true } },
);

const Transaction = mongoose.model("Transaction", TransactionSchema);

export default Transaction;
