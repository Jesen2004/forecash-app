import BoxHeader from "@/components/BoxHeader";
import DashboardBox from "@/components/DashboardBox";
import { useGetKpisQuery } from "@/state/api";
import { useTheme } from "@mui/material";
import { useMemo } from "react";
import {
  ResponsiveContainer,
  CartesianGrid,
  AreaChart,
  BarChart,
  Bar,
  LineChart,
  XAxis,
  YAxis,
  Legend,
  Line,
  Tooltip,
  Area,
} from "recharts";

const Row1 = () => {
  const { palette } = useTheme();
  const { data } = useGetKpisQuery();

  // ==========================================
  // 🌟 TAMBAHKAN FUNGSI FORMATTER BARU DI BAWAH INI 🌟
  // ==========================================
  const formatRupiahRingkas = (v: number) => {
    if (v >= 1000000) {
      return `Rp ${(v / 1000000).toFixed(0)} Jt`;
    } else if (v >= 1000) {
      return `Rp ${(v / 1000).toFixed(0)} Ribu`;
    }
    return `Rp ${v}`;
  };
  // ==========================================

  const revenue = useMemo(() => {
    return (
      data &&
      data[0].monthlyData.map(({ month, revenue }) => {
        return {
          name: month.substring(0, 3),
          Pendapatan: revenue * 100,
        };
      })
    );
  }, [data]);

  const revenueExpenses = useMemo(() => {
    return (
      data &&
      data[0].monthlyData.map(({ month, revenue, expenses }) => {
        return {
          name: month.substring(0, 3),
          Pendapatan: revenue * 100,
          Pengeluaran: expenses * 100,
        };
      })
    );
  }, [data]);

  const revenueProfit = useMemo(() => {
    return (
      data &&
      data[0].monthlyData.map(({ month, revenue, expenses }) => {
        return {
          name: month.substring(0, 3),
          Pendapatan: revenue * 100,
          Keuntungan: ((revenue - expenses) * 100).toFixed(2),
        };
      })
    );
  }, [data]);

  return (
    <>
      <DashboardBox sx={{ gridArea: "a" }}>
        <BoxHeader
          title="Pendapatan dan Pengeluaran"
          subtitle="garis atas menunjukkan pendapatan, garis bawah menunjukkan pengeluaran"
          sideText=""
        />
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            width={500}
            height={400}
            data={revenueExpenses}
            margin={{
              top: 15,
              right: 25,
              left: -10,
              bottom: 60,
            }}
          >
            <defs>
              <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor={palette.primary[300]}
                  stopOpacity={0.5}
                />
                <stop
                  offset="95%"
                  stopColor={palette.primary[300]}
                  stopOpacity={0}
                />
              </linearGradient>
              <linearGradient id="colorExpenses" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor={palette.primary[300]}
                  stopOpacity={0.5}
                />
                <stop
                  offset="95%"
                  stopColor={palette.primary[300]}
                  stopOpacity={0}
                />
              </linearGradient>
            </defs>
            <XAxis
              dataKey="name"
              tickLine={false}
              style={{ fontSize: "10px" }}
            />
            {/* ========================================== */}
            {/* 🌟 DIUBAH PADA GRID AREA A: DOMAIN JADI 80 JUTA & FORMATTER RINGKAS 🌟 */}
            {/* ========================================== */}
            <YAxis
              tickLine={false}
              axisLine={{ strokeWidth: "0" }}
              style={{ fontSize: "10px" }}
              domain={[0, 70000000]}
              tickFormatter={formatRupiahRingkas}
            />
            {/* ========================================== */}
            <Tooltip
              formatter={(value) =>
                `Rp ${Number(value).toLocaleString("id-ID")}`
              }
            />
            <Area
              type="monotone"
              name="Pendapatan"
              dataKey="Pendapatan"
              dot={true}
              stroke={palette.primary.main}
              fillOpacity={1}
              fill="url(#colorRevenue)"
            />
            <Area
              type="monotone"
              name="Pengeluaran"
              dataKey="Pengeluaran"
              dot={true}
              stroke={palette.primary.main}
              fillOpacity={1}
              fill="url(#colorExpenses)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </DashboardBox>
      <DashboardBox sx={{ gridArea: "b" }}>
        <BoxHeader
          title="Keuntungan dan Pendapatan"
          subtitle="garis atas berwarna hijau menunjukkan pendapatan, garis bawah berwarna ungu menunjukkan keuntungan"
          sideText=""
        />
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            width={500}
            height={400}
            data={revenueProfit}
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
            {/* 🌟 DIUBAH PADA GRID AREA B (KIRI): DOMAIN JADI 18 JUTA & FORMATTER RINGKAS 🌟 */}
            {/* ========================================== */}
            <YAxis
              yAxisId="left"
              tickLine={false}
              axisLine={false}
              style={{ fontSize: "10px" }}
              domain={[0, 70000000]}
              tickFormatter={formatRupiahRingkas}
            />
            {/* ========================================== */}
            {/* 🌟 DIUBAH PADA GRID AREA B (KANAN): DOMAIN JADI 70 JUTA & FORMATTER RINGKAS 🌟 */}
            {/* ========================================== */}
            <YAxis
              yAxisId="right"
              orientation="right"
              tickLine={false}
              axisLine={false}
              style={{ fontSize: "10px" }}
              domain={[0, 70000000]}
              tickFormatter={formatRupiahRingkas}
            />
            {/* ========================================== */}
            <Tooltip
              formatter={(value) =>
                `Rp ${Number(value).toLocaleString("id-ID")}`
              }
            />
            <Legend
              height={20}
              wrapperStyle={{
                margin: "0 0 10px 0",
              }}
            />
            <Line
              yAxisId="left"
              type="monotone"
              dataKey="Keuntungan"
              stroke={palette.tertiary[500]}
            />
            <Line
              yAxisId="right"
              type="monotone"
              dataKey="Pendapatan"
              stroke={palette.primary.main}
            />
          </LineChart>
        </ResponsiveContainer>
      </DashboardBox>
      <DashboardBox sx={{ gridArea: "c" }}>
        <BoxHeader
          title="Pendapatan dari Bulan ke Bulan"
          subtitle="grafik yang merepresentasikan pendapatan dari bulan ke bulan"
          sideText=""
        />
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            width={500}
            height={300}
            data={revenue}
            margin={{
              top: 17,
              right: 15,
              left: -5,
              bottom: 58,
            }}
          >
            <defs>
              <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor={palette.primary[300]}
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor={palette.primary[300]}
                  stopOpacity={0}
                />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} stroke={palette.grey[800]} />
            <XAxis
              dataKey="name"
              axisLine={false}
              tickLine={false}
              style={{ fontSize: "10px" }}
            />
            {/* ========================================== */}
            {/* 🌟 DIUBAH PADA GRID AREA C: DOMAIN JADI 80 JUTA & FORMATTER RINGKAS 🌟 */}
            {/* ========================================== */}
            <YAxis
              axisLine={false}
              tickLine={false}
              style={{ fontSize: "10px" }}
              domain={[0, 70000000]}
              tickFormatter={formatRupiahRingkas}
            />
            {/* ========================================== */}
            <Tooltip
              formatter={(value) =>
                `Rp ${Number(value).toLocaleString("id-ID")}`
              }
            />
            <Bar
              name="Pendapatan"
              dataKey="Pendapatan"
              fill="url(#colorRevenue)"
            />
          </BarChart>
        </ResponsiveContainer>
      </DashboardBox>
    </>
  );
};

export default Row1;
