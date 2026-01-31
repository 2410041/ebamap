const express = require("express");
const cors = require("cors");
const axios = require("axios");
const mysql = require("mysql2/promise");

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

const db = mysql.createPool({
    host: "db",          // docker-compose の service 名
    user: "root",
    password: "root",
    database: "ebamap",
});

app.get("/api/stores", async (req, res) => {
    try {
        const [rows] = await db.query("SELECT * FROM stores");
        res.json(rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Database query failed" });
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
    console.log(`Backend listening on http://localhost:${PORT}`);
});