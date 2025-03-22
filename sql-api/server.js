// Import thư viện cần thiết
const express = require("express");
const cors = require("cors");
const sql = require("mssql");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

// Cấu hình kết nối SQL Server
const config = {
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  server: process.env.DB_SERVER,
  database: process.env.DB_NAME,
  options: { encrypt: false, trustServerCertificate: true },
};

// Kết nối SQL Server
async function connectDB() {
  try {
    await sql.connect(config);
    console.log("✅ Kết nối SQL Server thành công!");
  } catch (err) {
    console.error("❌ Lỗi kết nối SQL Server:", err);
  }
}
connectDB();

// 📌 API Đăng nhập
app.post("/login", async (req, res) => {
  const { login, password } = req.body;

  if (!login || !password) {
    return res.status(400).json({ error: "Vui lòng nhập đầy đủ thông tin" });
  }

  try {
    const query = "SELECT * FROM Users WHERE email = @login OR usersname = @login";
    const request = new sql.Request();
    request.input("login", sql.NVarChar, login);
    const result = await request.query(query);

    if (result.recordset.length === 0) {
      return res.status(401).json({ error: "Thông tin đăng nhập không hợp lệ" });
    }

    const user = result.recordset[0];
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ error: "Thông tin đăng nhập không hợp lệ" });
    }

    const token = jwt.sign(
      { id: user.id, usersname: user.usersname, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.json({ message: "Đăng nhập thành công", token });
  } catch (err) {
    res.status(500).json({ error: "Lỗi server", details: err.message });
  }
});

// 📌 API Đăng ký
app.post("/register", async (req, res) => {
  const { name, email, usersname, password } = req.body;

  if (!name || !email || !usersname || !password) {
    return res.status(400).json({ error: "Vui lòng nhập đầy đủ thông tin." });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const checkUserQuery = "SELECT * FROM Users WHERE usersname = @usersname OR email = @email";
    const request = new sql.Request();
    request.input("usersname", sql.NVarChar, usersname);
    request.input("email", sql.NVarChar, email);
    const checkUser = await request.query(checkUserQuery);

    if (checkUser.recordset.length > 0) {
      return res.status(400).json({ error: "Tên đăng nhập hoặc email đã tồn tại." });
    }

    const insertQuery = "INSERT INTO Users (name, email, usersname, password) VALUES (@name, @email, @usersname, @password)";
    request.input("name", sql.NVarChar, name);
    request.input("password", sql.NVarChar, hashedPassword);
    await request.query(insertQuery);

    res.status(201).json({ message: "Đăng ký thành công!" });
  } catch (err) {
    res.status(500).json({ error: "Lỗi đăng ký", details: err.message });
  }
});

// 📌 Chạy server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server đang chạy tại http://localhost:${PORT}`);
});