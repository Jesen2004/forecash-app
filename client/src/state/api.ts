/* api.ts pada folder state ini berfungsi sebagai "JALUR KOMUNIKASI DATA / JEMBATAN API" (Central Data Fetching & 
Caching Layer) yang menghubungkan aplikasi Frontend (React) dengan server Backend (Node.js/Express.js) menggunakan 
Redux Toolkit Query (RTK Query). 
Secara awam, file ini bertugas mengirimkan permintaan (request) data ke server untuk mengambil data keuangan, 
produk, dan transaksi, lalu menyimpannya secara otomatis di memori aplikasi agar grafik dapat dirender secara 
real-time. 
*/

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type {
  GetKpisResponse,
  GetProductsResponse,
  GetTransactionsResponse,
} from "./types";

export const api = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_BASE_URL }),
  reducerPath: "main",
  tagTypes: ["Kpis", "Products", "Transactions"],
  endpoints: (build) => ({
    getKpis: build.query<Array<GetKpisResponse>, void>({
      query: () => "kpi/kpis/",
      providesTags: ["Kpis"],
    }),
    getProducts: build.query<Array<GetProductsResponse>, void>({
      query: () => "product/products/",
      providesTags: ["Products"],
    }),
    getTransactions: build.query<Array<GetTransactionsResponse>, void>({
      query: () => "transaction/transactions/",
      providesTags: ["Transactions"],
    }),
  }),
});

export const { useGetKpisQuery, useGetProductsQuery, useGetTransactionsQuery } =
  api;
