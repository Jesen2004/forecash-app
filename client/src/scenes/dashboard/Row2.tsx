import BoxHeader from "@/components/BoxHeader";
import DashboardBox from "@/components/DashboardBox";
import FlexBetween from "@/components/FlexBetween";
import { useGetKpisQuery, useGetProductsQuery } from "@/state/api";
import { Box, Typography, useTheme } from "@mui/material";
import { useMemo } from "react";
import {
  Tooltip,
  CartesianGrid,
  LineChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Line,
  PieChart,
  Pie,
  Cell,
  ScatterChart,
  Scatter,
  ZAxis,
} from "recharts";

const pieData = [
  { name: "Group A", value: 600 },
  { name: "Group B", value: 400 },
];

const Row2 = () => {
  const { palette } = useTheme();
  const pieColors = [palette.primary[800], palette.primary[300]];
  const { data: operationalData } = useGetKpisQuery();
  const { data: productData } = useGetProductsQuery();

  // ==========================================
  // 🌟 TAMBAHKAN: FUNGSI FORMATTER RUPIAH RINGKAS (Jt) 🌟
  // ==========================================
  const formatRupiahRingkas = (v: number) => {
    if (v >= 1000000) {
      // Jika angkanya pas jutaan bulat (seperti 1.000.000), buang koma .0-nya agar tetap rapi jadi "Rp 1 Jt"
      const hasilSatuDesimal = (v / 1000000).toFixed(1);
      return hasilSatuDesimal.endsWith(".0")
        ? `Rp ${hasilSatuDesimal.slice(0, -2)} Jt`
        : `Rp ${hasilSatuDesimal} Jt`;
    } else if (v >= 1000) {
      return `Rp ${(v / 1000).toFixed(0)} Ribu`;
    }
    return `Rp ${v}`;
  };
  // ==========================================

  const operationalExpenses = useMemo(() => {
    return (
      operationalData &&
      operationalData[0].monthlyData.map(
        ({ month, operationalExpenses, nonOperationalExpenses }) => {
          return {
            name: month.substring(0, 3),
            // 🌟 DIUBAH: Kalikan 100 agar kembali ke angka jutaan rupiah asli
            "Pengeluaran Operasional": operationalExpenses * 100,
            "Pengeluaran Non-Operasional": nonOperationalExpenses * 100,
          };
        },
      )
    );
  }, [operationalData]);

  const productExpenseData = useMemo(() => {
    return (
      productData &&
      productData.map(({ _id, price, expense }) => {
        return {
          id: _id,
          price: price * 100,
          expense: expense * 100,
        };
      })
    );
  }, [productData]);

  return (
    <>
      <DashboardBox sx={{ gridArea: "d" }}>
        <BoxHeader
          title="Pengeluaran Operasional vs Non-Operasional"
          subtitle="garis hijau menunjukkan pengeluaran operasional, garis ungu menunjukkan pengeluaran non-operasional"
          sideText=""
        />
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={operationalExpenses}
            margin={{
              top: 20,
              right: 0,
              left: -10,
              bottom: 55,
            }}
          >
            <CartesianGrid vertical={false} stroke={palette.grey[800]} />
            <XAxis
              dataKey="name"
              tickLine={false}
              style={{ fontSize: "10px" }}
            />
            {/* ========================================== */}
            {/* 🌟 DIUBAH: Sumbu Kiri disesuaikan ke 50 Jt & pasang tickFormatter 🌟 */}
            {/* ========================================== */}
            <YAxis
              yAxisId="left"
              orientation="left"
              tickLine={false}
              axisLine={false}
              style={{ fontSize: "10px" }}
              domain={[0, 40000000]}
              tickFormatter={formatRupiahRingkas}
            />
            {/* ========================================== */}
            {/* 🌟 DIUBAH: Sumbu Kanan disesuaikan ke 50 Jt & pasang tickFormatter 🌟 */}
            {/* ========================================== */}
            <YAxis
              yAxisId="right"
              orientation="right"
              tickLine={false}
              axisLine={false}
              style={{ fontSize: "10px" }}
              domain={[0, 40000000]}
              tickFormatter={formatRupiahRingkas}
            />
            {/* ========================================== */}
            <Tooltip
              formatter={(value) =>
                `Rp ${Number(value).toLocaleString("id-ID")}`
              }
            />
            <Line
              yAxisId="left"
              type="monotone"
              dataKey="Pengeluaran Non-Operasional"
              stroke={palette.tertiary[500]}
            />
            <Line
              yAxisId="right"
              type="monotone"
              dataKey="Pengeluaran Operasional"
              stroke={palette.primary.main}
            />
          </LineChart>
        </ResponsiveContainer>
      </DashboardBox>

      <DashboardBox sx={{ gridArea: "e" }}>
        <BoxHeader title="Kampanye dan Target Anggaran" sideText="" />
        <FlexBetween
          sx={{
            mt: "0.25rem",
            gap: "1.5rem",
            pr: "1rem",
            alignItems: "center",
          }}
        >
          <PieChart
            width={110}
            height={100}
            margin={{
              top: 0,
              right: -10,
              left: 10,
              bottom: 0,
            }}
          >
            <Pie
              stroke="none"
              data={pieData}
              innerRadius={18}
              outerRadius={38}
              paddingAngle={2}
              dataKey="value"
            >
              {pieData.map((_, index) => (
                <Cell key={`cell-${index}`} fill={pieColors[index]} />
              ))}
            </Pie>
          </PieChart>
          <Box sx={{ ml: "-0.7rem", flexBasis: "40%", textAlign: "center" }}>
            <Typography variant="h5">Target Alokasi</Typography>
            <Typography
              variant="h3"
              sx={{ m: "0.3rem 0", color: palette.primary[300] }}
            >
              30
            </Typography>
            <Typography variant="h6">
              Target sasaran finansial dari program survei perkuliahan
            </Typography>
          </Box>
          <Box sx={{ flexBasis: "40%" }}>
            <Typography variant="h5">Alokasi Surplus</Typography>
            <Typography variant="h6">Rasio tabungan saku 15%</Typography>
            <Typography variant="h5" sx={{ mt: "0.4rem" }}>
              Margin Efisiensi
            </Typography>
            <Typography variant="h6">
              Pengeluaran terkendali stabil di bawah rata-rata pemasukan bersih
              bulanan.
            </Typography>
          </Box>
        </FlexBetween>
      </DashboardBox>

      <DashboardBox sx={{ gridArea: "f" }}>
        <BoxHeader title="Harga Komponen Kuliah vs Pengeluaran" sideText="" />
        <ResponsiveContainer width="100%" height="100%">
          <ScatterChart
            margin={{
              top: 20,
              right: 25,
              bottom: 40,
              left: -10,
            }}
          >
            <CartesianGrid stroke={palette.grey[800]} />
            {/* ========================================== */}
            {/* 🌟 DIUBAH: Sumbu X dilonggarkan ke 1,4 Juta agar muat mouse & laptop mahal 🌟 */}
            {/* ========================================== */}
            <XAxis
              type="number"
              dataKey="price"
              name="price"
              axisLine={false}
              tickLine={false}
              style={{ fontSize: "10px" }}
              domain={[0, 1500000]}
              tickFormatter={formatRupiahRingkas}
            />
            {/* ========================================== */}
            {/* 🌟 DIUBAH: Sumbu Y dilonggarkan ke 1,4 Juta agar muat pengeluaran modal laptop 🌟 */}
            {/* ========================================== */}
            <YAxis
              type="number"
              dataKey="expense"
              name="expense"
              axisLine={false}
              tickLine={false}
              style={{ fontSize: "10px" }}
              domain={[0, 1000000]}
              tickFormatter={formatRupiahRingkas}
            />
            {/* ========================================== */}
            <ZAxis type="number" range={[5, 5]} />
            <Tooltip
              formatter={(v) => `Rp ${Number(v).toLocaleString("id-ID")}`}
            />
            <Scatter
              name="Rasio Biaya Kebutuhan Kuliah"
              data={productExpenseData}
              fill={palette.tertiary[500]}
            />
          </ScatterChart>
        </ResponsiveContainer>
      </DashboardBox>
    </>
  );
};

export default Row2;
