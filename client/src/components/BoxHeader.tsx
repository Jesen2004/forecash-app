/* BoxHeader berfungsi sebagai KERTAS KEPALA (Header) re-usable untuk setiap kotak grafik atau tabel pada aplikasi 
dasbor keuangan.
Sederhananya, komponen ini bertugas menampilkan judul, penjelasan singkat, dan informasi status penting di bagian 
atas setiap panel visualisasi data agar tampilan dasbor terlihat rapi, seragam, dan mudah dibaca oleh pengguna.
*/

import { Box, Typography, useTheme } from "@mui/material";
import React from "react";
import FlexBetween from "./FlexBetween";

type Props = {
  title: string;
  sideText: string;
  subtitle?: string;
  icon?: React.ReactNode;
};

const BoxHeader = ({ icon, title, subtitle, sideText }: Props) => {
  const { palette } = useTheme();
  return (
    <FlexBetween
      sx={{ color: palette.grey[400], margin: "1.5rem 1rem 0 1rem" }}
    >
      <FlexBetween>
        {icon}
        <Box sx={{ width: "100%" }}>
          <Typography variant="h4" sx={{ mb: "-0.1rem" }}>
            {title}
          </Typography>
          <Typography variant="h6">{subtitle}</Typography>
        </Box>
      </FlexBetween>
      <Typography
        variant="h5"
        sx={{ fontWeight: "700", color: palette.secondary[500] }}
      >
        {sideText}
      </Typography>
    </FlexBetween>
  );
};

export default BoxHeader;
