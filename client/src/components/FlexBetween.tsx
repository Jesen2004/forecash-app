/* FlexBetween berfungsi sebagai "PENGATUR TATA LETAK OTOMATIS" (Layout Utility) yang mensejajarkan dan merapikan 
posisi elemen-elemen antarmuka secara mendatar (horisontal).
Secara awam, file ini bertugas membuat dua atau lebih elemen (seperti judul di kiri dan teks/tombol di kanan) 
otomatis saling menjauh ke ujung kiri dan kanan, serta posisinya sejajar tegak lurus di tengah secara presisi.
*/

import { Box } from "@mui/material";
import { styled } from "@mui/system";

const FlexBetween = styled(Box)({
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
})

export default FlexBetween;