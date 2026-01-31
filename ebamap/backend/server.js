const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

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