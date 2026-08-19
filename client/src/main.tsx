/* main.tsx ini berfungsi sebagai "TITIK AWAL PENJALANAN APLIKASI & PENGHUBUNG DATA REDUX" (Entry Point & Global 
Store Initialization) yang pertama kali dieksekusi oleh browser untuk merender aplikasi React ke dalam layar.
Secara awam, file ini bertugas merakit penyimpanan data terpusat (Redux Store), menyambungkan alur data fetching 
otomatis dari API, lalu menempelkan seluruh aplikasi ke dalam halaman HTML.
*/

import ReactDOM from "react-dom/client";
import App from "@/App";
import "@/index.css";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { api } from "@/state/api";

export const store = configureStore({
  reducer: { [api.reducerPath]: api.reducer },
  middleware: (getDefault) => getDefault().concat(api.middleware),
});
setupListeners(store.dispatch);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <Provider store={store}>
    <App />
  </Provider>,
);
