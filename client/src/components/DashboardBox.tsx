/* DashboardBox berfungsi sebagai "WADAH ATALASE" / "BINGKAI KOTAK" (Card Container) yang menyelimuti setiap grafik, 
diagram, dan tabel di dalam aplikasi dasbor keuangan. 
Secara awam, file ini bertugas memberikan gaya tampilan (styling) yang seragam pada ke-10 Grid Area di dasbor 
(seperti kartu informasi), sehingga setiap grafik tidak melayang polos di latar belakang, melainkan memiliki kotak 
pembungkus yang rapi, elegan, dan konsisten. 
*/

import { Box } from "@mui/material";
import { styled } from "@mui/system";

const DashboardBox = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.background.light,
  borderRadius: "1rem",
  boxShadow: "0.15rem 0.2rem 0.15rem 0.1rem rgba(0, 0, 0, .8)",
}));

export default DashboardBox;
