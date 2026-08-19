/* index.tsx pada folder predictions ini berfungsi sebagai "HALAMAN ANALITIK PREDIKTIF" (Forecasting View Page) 
yang menghitung dan merender grafik peramalan tren pendapatan masa depan berbasis algoritma Regresi Linear 
Sederhana (Y=a+bX). 
Secara awam, file ini bertugas mengolah data historis pemasukan, membuat garis tren terbaik (best fit line), lalu 
menampilkan garis proyeksi putus-putus oranye ketika tombol pemicu prediksi diklik oleh pengguna. 
*/

import DashboardBox from "@/components/DashboardBox";
import FlexBetween from "@/components/FlexBetween";
import { useGetKpisQuery } from "@/state/api";
import { Box, Button, Typography, useTheme } from "@mui/material";
import { useMemo, useState } from "react";
import {
  CartesianGrid,
  Label,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import regression from "regression";
import type { DataPoint } from "regression";

const Predictions = () => {
  const { palette } = useTheme();
  const [isPredictions, setIsPredictions] = useState(false);
  const { data: kpiData } = useGetKpisQuery();

  // ==========================================
  // 🌟 TAMBAHKAN: FUNGSI FORMATTER RUPIAH RINGKAS (Jt) DENGAN KOMA 🌟
  // ==========================================
  const formatRupiahRingkas = (v: number) => {
    if (v >= 1000000) {
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

  const formattedData = useMemo(() => {
    if (!kpiData) return [];
    const monthData = kpiData[0].monthlyData;

    // 🌟 DIUBAH: Kalikan 100 agar algoritma Regresi menghitung angka jutaan asli
    const formatted: Array<DataPoint> = monthData.map(
      ({ revenue }, i: number) => {
        return [i, revenue * 100];
      },
    );
    const regressionLine = regression.linear(formatted);

    return monthData.map(({ month, revenue }, i: number) => {
      return {
        name: month.substring(0, 3), // Memotong bulan jadi 3 huruf agar hemat ruang (Jan, Feb, dst)
        // 🌟 DIUBAH: Kalikan 100 pada semua properti visual chart
        "Actual Revenue": revenue * 100,
        "Regression Line": regressionLine.points[i][1],
        "Predicted Revenue": regressionLine.predict(i + 12)[1],
      };
    });
  }, [kpiData]);

  return (
    <DashboardBox
      sx={{ width: "100%", height: "100%", p: "1rem", overflow: "hidden" }}
    >
      <FlexBetween sx={{ m: "1rem 2.5rem", gap: "1rem" }}>
        <Box>
          <Typography variant="h3">Pendapatan dan Prediksi Keuangan</Typography>
          <Typography variant="h6">
            Grafik perbandingan pendapatan aktual dan prediksi berdasarkan model
            regresi linear sederhana
          </Typography>
        </Box>
        <Button
          onClick={() => setIsPredictions(!isPredictions)}
          sx={{
            color: palette.grey[900],
            backgroundColor: palette.grey[700],
            boxShadow: "0.1rem 0.1rem 0.1rem 0.1rem rgba(0,0,0,.4)",
            p: "0.5rem 1rem",
            "&:hover": { backgroundColor: palette.grey[600] },
          }}
        >
          {isPredictions
            ? "Sembunyikan Prediksi"
            : "Tampilkan Prediksi Pendapatan Tahun Depan"}
        </Button>
      </FlexBetween>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={formattedData}
          margin={{
            top: 20,
            right: 75,
            left: 20,
            bottom: 80,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke={palette.grey[800]} />
          <XAxis dataKey="name" tickLine={false} style={{ fontSize: "10px" }}>
            <Label value="Bulan" offset={-5} position="insideBottom" />
          </XAxis>
          {/* ========================================== */}
          {/* 🌟 DIUBAH: DOMAIN DINAIKKAN KE 80 JUTA & PASANG TICK FORMATTER Jt 🌟 */}
          {/* ========================================== */}
          <YAxis
            domain={[0, 100000000]}
            axisLine={{ strokeWidth: "0" }}
            style={{ fontSize: "10px" }}
            tickFormatter={formatRupiahRingkas}
          >
            <Label
              value="Pendapatan (Rp)"
              angle={-90}
              offset={-5}
              position="insideLeft"
            />
          </YAxis>
          {/* ========================================== */}
          <Tooltip
            formatter={(value) => `Rp ${Number(value).toLocaleString("id-ID")}`}
          />
          <Legend verticalAlign="top" />
          <Line
            type="monotone"
            dataKey="Actual Revenue"
            name="Pendapatan Aktual"
            stroke={palette.primary.main}
            strokeWidth={0}
            dot={{ strokeWidth: 5 }}
          />
          <Line
            type="monotone"
            dataKey="Regression Line"
            name="Garis Regresi Linear"
            stroke="#8884d8"
            dot={false}
          />
          {isPredictions && (
            <Line
              type="monotone"
              strokeDasharray="5 5"
              dataKey="Predicted Revenue"
              name="Prediksi Pendapatan Masa Depan"
              stroke={palette.secondary[500]}
            />
          )}
        </LineChart>
      </ResponsiveContainer>
    </DashboardBox>
  );
};

export default Predictions;
