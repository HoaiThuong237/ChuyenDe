const sql = require("mssql");
const cors = require("cors");
const express = require("express");
require("dotenv").config(); // Load biến môi trường từ file .env

const app = express();
app.use(cors());
app.use(express.json());

// Cấu hình kết nối SQL Server
const config = {
  user: process.env.DB_USER,        // Thay vì process.env.sa
  password: process.env.DB_PASS,    // Thay vì process.env.123456
  server: process.env.DB_SERVER,    // Thay vì process.env.localhost
  database: process.env.DB_NAME,    // Thay vì process.env.Mon_an
  options: { encrypt: false, trustServerCertificate: true },
};

// Kết nối đến SQL Server
async function connectDB() {
  try {
    await sql.connect(config);
    console.log("✅ Kết nối SQL Server thành công!");
  } catch (err) {
    console.error("❌ Lỗi kết nối SQL Server:", err);
  }
}
connectDB();

// API GET: Lấy danh sách công thức nấu ăn
app.get("/recipes", async (req, res) => {
  try {
    const result = await sql.query("SELECT * FROM recipes");
    res.json(result.recordset);
  } catch (err) {
    res.status(500).json({ error: "Lỗi truy vấn SQL", details: err.message });
  }
});

// Chạy server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server đang chạy tại http://localhost:${PORT}`);
});
