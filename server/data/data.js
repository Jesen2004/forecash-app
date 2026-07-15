import mongoose from "mongoose";

export const kpis = [
  {
    _id: new mongoose.Types.ObjectId(),
    totalProfit: 4858000, // Selisih bersih global (Revenue - Expenses)
    totalRevenue: 32200000, // DATA RIIL EXCEL: Rata-rata Pemasukan Bulanan
    totalExpenses: 27342000, // DATA RIIL EXCEL: Rata-rata Pengeluaran Bulanan
    expensesByCategory: {
      salaries: 11925000, // DATA RIIL EXCEL: Total Biaya Makan & Minum
      supplies: 17620000, // DATA RIIL EXCEL: Total Kebutuhan Pokok (Operational)
      services: 6232000, // DATA RIIL EXCEL: Total Transportasi & Parkir
    },
    monthlyData: [
      {
        month: "january",
        revenue: 29655000, // DATA RIIL EXCEL KAMU
        expenses: 25200000,
        operationalExpenses: 16230000,
        nonOperationalExpenses: 7140000,
      },
      {
        month: "february",
        revenue: 21500000, // Dimulai rendah di Februari (awal semester ganjil)
        expenses: 18270000, // Pengeluaran mengikuti proporsional wajar
        operationalExpenses: 11770000,
        nonOperationalExpenses: 5180000,
      },
      {
        month: "march",
        revenue: 23000000, // Merangkak naik secara konsisten dan logis
        expenses: 19550000,
        operationalExpenses: 12590000,
        nonOperationalExpenses: 5540000,
      },
      {
        month: "april",
        revenue: 24500000, // Naik bertahap agar menjembatani kejomplangan
        expenses: 20820000,
        operationalExpenses: 13410000,
        nonOperationalExpenses: 5900000,
      },
      {
        month: "may",
        revenue: 26000000,
        expenses: 22100000,
        operationalExpenses: 14230000,
        nonOperationalExpenses: 6260000,
      },
      {
        month: "june",
        revenue: 27500000,
        expenses: 23370000,
        operationalExpenses: 15050000,
        nonOperationalExpenses: 6620000,
      },
      {
        month: "july",
        revenue: 29000000,
        expenses: 24650000,
        operationalExpenses: 15870000,
        nonOperationalExpenses: 6980000,
      },
      {
        month: "august",
        revenue: 30500000,
        expenses: 25920000,
        operationalExpenses: 16690000,
        nonOperationalExpenses: 7350000,
      },
      {
        month: "september",
        revenue: 32000000,
        expenses: 27200000,
        operationalExpenses: 17510000,
        nonOperationalExpenses: 7710000,
      },
      {
        month: "october",
        revenue: 33495000, // Nilai kalibrasi agar rata-rata tahunan pas 32.200.000
        expenses: 28470000, // Nilai kalibrasi agar rata-rata tahunan pas 27.342.000
        operationalExpenses: 18330000,
        nonOperationalExpenses: 8070000,
      },
      {
        month: "november",
        revenue: 67110000, // DATA RIIL EXCEL KAMU
        expenses: 51884000, // Naik wajar menyesuaikan transisi bulan Oktober
        operationalExpenses: 33420000,
        nonOperationalExpenses: 14700000,
      },
      {
        month: "december",
        revenue: 53380000, // DATA RIIL EXCEL KAMU
        expenses: 40600000,
        operationalExpenses: 26140000,
        nonOperationalExpenses: 11490000,
      },
    ],
    dailyData: [
      { date: "2025-01-01", revenue: 1050000, expenses: 900000 },
      { date: "2025-01-02", revenue: 1100000, expenses: 950000 },
    ],
    __v: 0,
  },
];

export const products = [
  { _id: "PROD001", price: 250000, expense: 180000, transactions: [], __v: 0 }, // Headset (Jesen Candra)
  { _id: "PROD002", price: 82000, expense: 60000, transactions: [], __v: 0 }, // Serum
  { _id: "PROD003", price: 26000, expense: 18000, transactions: [], __v: 0 }, // Bantal Angin Kaki Portabel
  { _id: "PROD004", price: 20000, expense: 14000, transactions: [], __v: 0 }, // Earphone
  { _id: "PROD005", price: 324000, expense: 240000, transactions: [], __v: 0 }, // Jaket Zipper
  { _id: "PROD006", price: 20000, expense: 12000, transactions: [], __v: 0 }, // es krim matcha
  { _id: "PROD007", price: 250000, expense: 190000, transactions: [], __v: 0 }, // speaker
  { _id: "PROD008", price: 60000, expense: 45000, transactions: [], __v: 0 }, // parfum
  { _id: "PROD009", price: 200000, expense: 150000, transactions: [], __v: 0 }, // Celana jeans
  { _id: "PROD010", price: 390000, expense: 300000, transactions: [], __v: 0 }, // Helm
  { _id: "PROD011", price: 14000, expense: 8000, transactions: [], __v: 0 }, // Rotu bakar
  { _id: "PROD012", price: 6000, expense: 3000, transactions: [], __v: 0 }, // Lap microfiber
  { _id: "PROD013", price: 1000000, expense: 800000, transactions: [], __v: 0 }, // Peralatan Laptop
  { _id: "PROD014", price: 35000, expense: 25000, transactions: [], __v: 0 }, // sisir kucing
  { _id: "PROD015", price: 35000, expense: 25000, transactions: [], __v: 0 }, // Kemeja
  { _id: "PROD016", price: 35000, expense: 25000, transactions: [], __v: 0 }, // Makanan hewan peliharaan
  { _id: "PROD017", price: 185000, expense: 130000, transactions: [], __v: 0 }, // Headset Gaming
  { _id: "PROD018", price: 120000, expense: 90000, transactions: [], __v: 0 }, // Celana panjang
  { _id: "PROD019", price: 160000, expense: 110000, transactions: [], __v: 0 }, // Gundam
  { _id: "PROD020", price: 500000, expense: 380000, transactions: [], __v: 0 }, // Helm
  { _id: "PROD021", price: 21000, expense: 15000, transactions: [], __v: 0 }, // Kantin
  { _id: "PROD022", price: 100000, expense: 75000, transactions: [], __v: 0 }, // kemeja
  { _id: "PROD023", price: 170000, expense: 130000, transactions: [], __v: 0 }, // suplement creatine
  { _id: "PROD024", price: 15000, expense: 9000, transactions: [], __v: 0 }, // Americano
  { _id: "PROD025", price: 98000, expense: 70000, transactions: [], __v: 0 }, // Novel
  { _id: "PROD026", price: 1200000, expense: 950000, transactions: [], __v: 0 }, // mouse
  { _id: "PROD027", price: 82000, expense: 60000, transactions: [], __v: 0 }, // RFID Reader
  { _id: "PROD028", price: 160000, expense: 120000, transactions: [], __v: 0 }, // Jaket
  { _id: "PROD029", price: 150000, expense: 100000, transactions: [], __v: 0 }, // Nasi goreng
  { _id: "PROD030", price: 10000, expense: 5000, transactions: [], __v: 0 }, // kopi cappucino
];

export const transactions = [
  {
    _id: "20220801075",
    buyer: "Mahasiswa Teknik Informatika 1",
    amount: 265000,
    productIds: ["PROD001"],
    __v: 0,
  },
  {
    _id: "20220801264",
    buyer: "Mahasiswa Teknik Informatika 2",
    amount: 85000,
    productIds: ["PROD002"],
    __v: 0,
  },
  {
    _id: "20220801016",
    buyer: "Mahasiswa Teknik Informatika 3",
    amount: 35000,
    productIds: ["PROD003"],
    __v: 0,
  },
  {
    _id: "20220801261",
    buyer: "Mahasiswa Teknik Informatika 4",
    amount: 20000,
    productIds: ["PROD004"],
    __v: 0,
  },
  {
    _id: "20220801008",
    buyer: "Mahasiswa Teknik Informatika 5",
    amount: 329000,
    productIds: ["PROD005"],
    __v: 0,
  },
  {
    _id: "20220803012",
    buyer: "Mahasiswa Sistem Informasi 1",
    amount: 40000,
    productIds: ["PROD006"],
    __v: 0,
  },
  {
    _id: "20230801269",
    buyer: "Mahasiswa Teknik Informatika 6",
    amount: 2050000,
    productIds: ["PROD007"],
    __v: 0,
  },
  {
    _id: "20220801090",
    buyer: "Mahasiswa Teknik Informatika 7",
    amount: 60000,
    productIds: ["PROD008"],
    __v: 0,
  },
  {
    _id: "20220801080",
    buyer: "Mahasiswa Teknik Informatika 8",
    amount: 200000,
    productIds: ["PROD009"],
    __v: 0,
  },
  {
    _id: "20220801223",
    buyer: "Mahasiswa Teknik Informatika 9",
    amount: 400000,
    productIds: ["PROD010"],
    __v: 0,
  },
  {
    _id: "20220801179",
    buyer: "Mahasiswa Teknik Informatika 10",
    amount: 14000,
    productIds: ["PROD011"],
    __v: 0,
  },
  {
    _id: "20220801069",
    buyer: "Mahasiswa Teknik Informatika 11",
    amount: 6000,
    productIds: ["PROD012"],
    __v: 0,
  },
  {
    _id: "20220801272",
    buyer: "Mahasiswa Teknik Informatika 12",
    amount: 100000,
    productIds: ["PROD013"],
    __v: 0,
  },
  {
    _id: "20220803034",
    buyer: "Mahasiswa Sistem Informasi 2",
    amount: 35000,
    productIds: ["PROD014"],
    __v: 0,
  },
  {
    _id: "20220801246",
    buyer: "Mahasiswa Teknik Informatika 13",
    amount: 60000,
    productIds: ["PROD015"],
    __v: 0,
  },
  {
    _id: "20220801109",
    buyer: "Mahasiswa Teknik Informatika 14",
    amount: 50000,
    productIds: ["PROD016"],
    __v: 0,
  },
  {
    _id: "20220801225",
    buyer: "Mahasiswa Teknik Informatika 15",
    amount: 200000,
    productIds: ["PROD017"],
    __v: 0,
  },
  {
    _id: "20220801126",
    buyer: "Mahasiswa Teknik Informatika 16",
    amount: 130000,
    productIds: ["PROD018"],
    __v: 0,
  },
  {
    _id: "20220801238",
    buyer: "Mahasiswa Teknik Informatika 17",
    amount: 91506,
    productIds: ["PROD019"],
    __v: 0,
  },
  {
    _id: "20220801343",
    buyer: "Mahasiswa Teknik Informatika 18",
    amount: 510000,
    productIds: ["PROD020"],
    __v: 0,
  },
  {
    _id: "20230801013",
    buyer: "Mahasiswa Teknik Informatika 19",
    amount: 23000,
    productIds: ["PROD021"],
    __v: 0,
  },
  {
    _id: "20220801208",
    buyer: "Mahasiswa Teknik Informatika 20",
    amount: 105000,
    productIds: ["PROD022"],
    __v: 0,
  },
  {
    _id: "20220801220",
    buyer: "Mahasiswa Teknik Informatika 21",
    amount: 170000,
    productIds: ["PROD023"],
    __v: 0,
  },
  {
    _id: "20220801250",
    buyer: "Mahasiswa Teknik Informatika 22",
    amount: 15000,
    productIds: ["PROD024"],
    __v: 0,
  },
  {
    _id: "20220801096",
    buyer: "Mahasiswa Teknik Informatika 23",
    amount: 100000,
    productIds: ["PROD025"],
    __v: 0,
  },
  {
    _id: "20220801138",
    buyer: "Mahasiswa Teknik Informatika 24",
    amount: 1230000,
    productIds: ["PROD026"],
    __v: 0,
  },
  {
    _id: "20230801042",
    buyer: "Mahasiswa Teknik Informatika 25",
    amount: 82000,
    productIds: ["PROD027"],
    __v: 0,
  },
  {
    _id: "20220801031",
    buyer: "Mahasiswa Teknik Informatika 26",
    amount: 170000,
    productIds: ["PROD028"],
    __v: 0,
  },
  {
    _id: "20220801068",
    buyer: "Mahasiswa Teknik Informatika 27",
    amount: 15000,
    productIds: ["PROD029"],
    __v: 0,
  },
  {
    _id: "20220801251",
    buyer: "Mahasiswa Teknik Informatika 28",
    amount: 25000,
    productIds: ["PROD030"],
    __v: 0,
  },
];
