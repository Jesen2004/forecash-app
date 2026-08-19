/* App.tsx ini berfungsi sebagai "PINTU UTAMA & PENGATUR TEMA APLIKASI" (Root Component & Routing Engine) yang 
menggabungkan seluruh komponen antarmuka, pengaturan tema dark mode, serta sistem navigasi antarhalaman. 
Secara awam, file ini bertugas sebagai fondasi tempat menempelnya bilah navigasi (Navbar), penyedia tema visual 
Material UI, dan pengatur alur perpindahan antarahalaman aplikasi. 
*/

import { Box, CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { useMemo } from "react";
import { themeSettings } from "./theme";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "@/scenes/navbar";
import Dashboard from "@/scenes/dashboard";
import Predictions from "@/scenes/predictions";

function App() {
  const theme = useMemo(() => createTheme(themeSettings), []);
  return (
    <div className="app">
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Box
            sx={{
              width: "100%",
              height: "100%",
              padding: "1rem 2rem 4rem 2rem",
            }}
          >
            <Navbar />
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/predictions" element={<Predictions />} />
            </Routes>
          </Box>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
