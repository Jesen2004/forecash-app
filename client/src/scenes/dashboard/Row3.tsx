import BoxHeader from "@/components/BoxHeader";
import DashboardBox from "@/components/DashboardBox";
import FlexBetween from "@/components/FlexBetween";
import {
  useGetKpisQuery,
  useGetProductsQuery,
  useGetTransactionsQuery,
} from "@/state/api";
import { Box, Typography, useTheme } from "@mui/material";
import { useMemo } from "react";
import { Cell, Pie, PieChart } from "recharts";

const Row3 = () => {
  const { palette } = useTheme();
  const pieColors = [palette.primary[800], palette.primary[500]];

  const { data: kpiData } = useGetKpisQuery();
  const { data: productData } = useGetProductsQuery();
  const { data: transactionData } = useGetTransactionsQuery();

  const pieChartData = useMemo(() => {
    if (kpiData && kpiData[0]?.expensesByCategory) {
      const totalExpenses = kpiData[0].totalExpenses;
      return Object.entries(kpiData[0].expensesByCategory).map(
        ([key, value]) => {
          let kategoriIndo = key;
          if (key === "salaries") kategoriIndo = "Makan & Minum";
          if (key === "supplies")
            kategoriIndo = "Perlengkapan & Fasilitas Akademik";
          if (key === "services") kategoriIndo = "Transportasi & Parkir";

          return [
            {
              name: kategoriIndo,
              value: value as number,
            },
            {
              name: `${kategoriIndo} of Total`,
              value: totalExpenses - (value as number),
            },
          ];
        },
      );
    }
  }, [kpiData]);

  return (
    <>
      {/* g: List of Products */}
      <DashboardBox
        sx={{
          gridArea: "g",
          overflowY: "auto",
          "&::-webkit-scrollbar": { width: "6px" },
          "&::-webkit-scrollbar-thumb": {
            bgcolor: palette.grey[800],
            borderRadius: "3px",
          },
          "&::-webkit-scrollbar-track": { bgcolor: "transparent" },
        }}
      >
        <BoxHeader
          title="Daftar Komponen Biaya"
          sideText={`${productData?.length || 0} produk terdaftar`}
        />
        <Box
          sx={{
            mt: "0.5rem",
            p: "0 1rem",
            height: "75%",
            overflowY: "auto",
            "&::-webkit-scrollbar": { width: "6px" },
            "&::-webkit-scrollbar-thumb": {
              bgcolor: palette.grey[800],
              borderRadius: "3px",
            },
            "&::-webkit-scrollbar-track": { bgcolor: "transparent" },
          }}
        >
          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
              color: palette.grey[300],
              fontSize: "11px",
            }}
          >
            <thead>
              <tr
                style={{
                  borderBottom: `1px solid ${palette.grey[800]}`,
                  height: "30px",
                  textAlign: "left",
                }}
              >
                <th style={{ padding: "4px" }}>id</th>
                <th style={{ padding: "4px" }}>Alokasi Biaya</th>
                <th style={{ padding: "4px" }}>Harga Satuan</th>
              </tr>
            </thead>
            <tbody>
              {(productData || []).map((row) => (
                <tr
                  key={row._id}
                  style={{
                    borderBottom: `1px solid ${palette.grey[800]}`,
                    height: "32px",
                  }}
                >
                  <td style={{ padding: "4px" }}>{row._id}</td>
                  <td style={{ padding: "4px" }}>
                    {/* 🌟 DIUBAH: Kalikan 100 agar nominal modal kembali normal ke ribuan rupiah */}
                    Rp {Number(row.expense * 100).toLocaleString("id-ID")}
                  </td>
                  <td style={{ padding: "4px" }}>
                    {/* 🌟 DIUBAH: Kalikan 100 agar nominal harga jual kembali normal ke ribuan rupiah */}
                    Rp {Number(row.price * 100).toLocaleString("id-ID")}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Box>
      </DashboardBox>

      {/* h: Recent Orders */}
      <DashboardBox
        sx={{
          gridArea: "h",
          overflowY: "auto",
          "&::-webkit-scrollbar": { width: "6px" },
          "&::-webkit-scrollbar-thumb": {
            bgcolor: palette.grey[800],
            borderRadius: "3px",
          },
          "&::-webkit-scrollbar-track": { bgcolor: "transparent" },
        }}
      >
        <BoxHeader
          title="Transaksi Pencatatan Terakhir"
          sideText={`${transactionData?.length || 0} transaksi terbaru`}
        />
        <Box
          sx={{
            mt: "0.5rem",
            p: "0 1rem",
            height: "75%",
            overflowY: "auto",
            "&::-webkit-scrollbar": { width: "6px" },
            "&::-webkit-scrollbar-thumb": {
              bgcolor: palette.grey[800],
              borderRadius: "3px",
            },
            "&::-webkit-scrollbar-track": { bgcolor: "transparent" },
          }}
        >
          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
              color: palette.grey[300],
              fontSize: "11px",
            }}
          >
            <thead>
              <tr
                style={{
                  borderBottom: `1px solid ${palette.grey[800]}`,
                  height: "30px",
                  textAlign: "left",
                }}
              >
                <th style={{ padding: "4px" }}>id</th>
                <th style={{ padding: "4px" }}>Responden (Mahasiswa)</th>
                <th style={{ padding: "4px" }}>Total Nominal</th>
                <th style={{ padding: "4px" }}>Jumlah Item</th>
              </tr>
            </thead>
            <tbody>
              {(transactionData || []).map((row) => (
                <tr
                  key={row._id}
                  style={{
                    borderBottom: `1px solid ${palette.grey[800]}`,
                    height: "32px",
                  }}
                >
                  <td style={{ padding: "4px" }}>{row._id}</td>
                  <td style={{ padding: "4px" }}>{row.buyer}</td>
                  <td style={{ padding: "4px" }}>
                    {/* 🌟 DIUBAH: Kalikan 100 agar nominal transaksi mahasiswa kembali normal */}
                    Rp {Number(row.amount * 100).toLocaleString("id-ID")}
                  </td>
                  <td style={{ padding: "4px" }}>
                    {row.productIds?.length || 0}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Box>
      </DashboardBox>

      {/* i: Expense Breakdown By Category */}
      <DashboardBox sx={{ gridArea: "i" }}>
        <BoxHeader
          title="Rincian Pengeluaran Berdasarkan Kategori"
          sideText=""
        />
        <FlexBetween
          sx={{
            mt: "0.25rem",
            p: "0 1rem",
            textAlign: "center",
            alignItems: "center",
            justify: "space-around",
            height: "70%",
          }}
        >
          {pieChartData?.slice(0, 3).map((data, i) => (
            <Box
              key={`${data[0].name}-${i}`}
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <PieChart width={80} height={65}>
                <Pie
                  stroke="none"
                  data={data}
                  innerRadius={16}
                  outerRadius={28}
                  paddingAngle={2}
                  dataKey="value"
                >
                  {data.map((_, index) => (
                    <Cell key={`cell-${index}`} fill={pieColors[index]} />
                  ))}
                </Pie>
              </PieChart>
              <Typography
                variant="h5"
                sx={{ textAlign: "center", width: "100%", mt: "0.25rem" }}
              >
                {data[0].name}
              </Typography>
            </Box>
          ))}
        </FlexBetween>
      </DashboardBox>

      {/* j: Overall Summary */}
      <DashboardBox sx={{ gridArea: "j" }}>
        <BoxHeader title="Ringkasan Analisis Keseluruhan Data" sideText="" />
        <Box
          sx={{
            height: "15px",
            margin: "1.25rem 1rem 0.4rem 1rem",
            bgcolor: palette.primary[800],
            borderRadius: "1rem",
          }}
        >
          <Box
            sx={{
              height: "15px",
              bgcolor: palette.primary[600],
              borderRadius: "1rem",
              width: "40%",
            }}
          ></Box>
        </Box>
        <Typography sx={{ margin: "0 1rem", lineHeight: "1.4" }} variant="h6">
          {/* 🌟 DIUBAH: Mengubah teks 31 sampel menjadi 30 sampel agar cocok dengan filter data kuesioner */}
          Berdasarkan hasil pengumpulan data primer terhadap 30 sampel mahasiswa
          FASILKOM Angkatan 2022-2023 Universitas Esa Unggul Bekasi, model
          dasbor berhasil mengklasifikasikan pengeluaran pokok menjadi tiga
          klaster utama yaitu Makan & Minum, Perlengkapan & Fasilitas Akademik,
          Transportasi & Parkir. Model dasbor ini merepresentasikan stabilitas
          antara pemasukan bulanan mahasiswa terhadap pengeluaran bulanan
          mahasiswa.
        </Typography>
      </DashboardBox>
    </>
  );
};

export default Row3;
