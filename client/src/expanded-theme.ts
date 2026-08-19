/* expanded-theme.ts ini berfungsi sebagai "MODIFIKASI PENAMBAHAN WARNA TEMA" (TypeScript Palette Extension / Type 
Augmentation) yang memperluas pilihan warna bawaan dari pustaka antarmuka Material UI (MUI). 
Secara awam, file ini bertugas mendaftarkan warna kustom baru (yaitu skema warna tertiary beserta varian gradasinya)
ke dalam sistem tema aplikasi, sehingga TypeScript tidak menganggap warna tambahan tersebut sebagai error. 
*/

import "@mui/material/styles";

declare module "@mui/material/styles" {
  interface PaletteColor {
    [key: number]: string;
  }

  interface Palette {
    tertiary: PaletteColor;
  }
}
