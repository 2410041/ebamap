const express = require("express");
const cors = require("cors");
const axios = require("axios");
const mysql = require("mysql2/promise");

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

const db = mysql.createPool({
    // docker-compose の service 名
    host: "db",
    user: "root",
    password: "root",
    database: "ebamap",
});

// 接続成功時の処理
// グローバルに設定（他のルートファイルでも使用可能に）
global.db = db;

// データベース接続テスト
db.getConnection()
    .then(connection => {
        console.log('✅ DB接続成功');
        connection.release();
    })
    .catch(err => {
        console.error('❌ DB接続失敗:', err.message);
    });

// データベースから店舗一覧を取得
app.get("/api/stores", async (req, res) => {
    try {
        const [rows] = await db.query("SELECT * FROM stores");
        res.json(rows);
    } catch (error) {
        console.error('❌ DB query error:', error.message);
        res.status(500).json({ error: "Database query failed" });
    }
});

// Python APIから店舗一覧を取得
app.get("/api/stores/python", async (req, res) => {
    try {
        const response = await axios.get("http://python:8000/stores");
        res.json({
            source: "node",
            data: response.data
        });
    } catch (error) {
        console.error('❌ Python API error:', error.message);
        res.status(500).json({ error: "Failed to fetch stores from Python API" });
    }
});

app.get("/", (req, res) => {
    res.json({
        message: "Backend is running 🚀",
    });
});

app.get("/api/health", (req, res) => {
    res.json({ status: "ok" });
});

app.get("/api/python", async (req, res) => {
    try {
        const response = await axios.get("http://python:8000/calc");
        res.json({
            from: "node",
            pythonResult: response.data,
        });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: "Python API call failed" });
    }
});

app.listen(PORT, () => {
    console.log(`🚀 Backend listening on http://localhost:${PORT}`);
    console.log(`📍 Available endpoints:`);
    console.log(`   GET /                    - Health check`);
    console.log(`   GET /api/health          - API health status`);
    console.log(`   GET /api/stores          - Stores from database`);
    console.log(`   GET /api/stores/python   - Stores from Python API`);
    console.log(`   GET /api/python          - Python calculation test`);
});

module.exports = global;