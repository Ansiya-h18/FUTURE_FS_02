const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const cors = require("cors");

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Connect SQLite database
const db = new sqlite3.Database("./crm.db", (err) => {
    if (err) {
        console.error("Database connection error:", err.message);
    } else {
        console.log("Connected to SQLite database");
    }
});

// Create leads table if not exists
db.run(`
    CREATE TABLE IF NOT EXISTS leads (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        email TEXT NOT NULL,
        status TEXT DEFAULT 'New'
    )
`);

// GET all leads
app.get("/leads", (req, res) => {
    db.all("SELECT * FROM leads ORDER BY id DESC", [], (err, rows) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(rows);
    });
});

// POST add lead
app.post("/leads", (req, res) => {
    const { name, email } = req.body;

    if (!name || !email) {
        return res.status(400).json({
            error: "Name and email are required"
        });
    }

    db.run(
        "INSERT INTO leads (name, email, status) VALUES (?, ?, ?)",
        [name, email, "New"],
        function (err) {
            if (err) {
                return res.status(500).json({ error: err.message });
            }

            res.json({
                message: "Lead added successfully",
                id: this.lastID
            });
        }
    );
});

// PUT mark as Contacted
app.put("/leads/:id/contacted", (req, res) => {
    const id = req.params.id;

    db.run(
        "UPDATE leads SET status = ? WHERE id = ?",
        ["Contacted", id],
        function (err) {
            if (err) {
                return res.status(500).json({ error: err.message });
            }

            res.json({
                message: "Lead marked as Contacted"
            });
        }
    );
});

// PUT mark as Converted
app.put("/leads/:id/converted", (req, res) => {
    const id = req.params.id;

    db.run(
        "UPDATE leads SET status = ? WHERE id = ?",
        ["Converted", id],
        function (err) {
            if (err) {
                return res.status(500).json({ error: err.message });
            }

            res.json({
                message: "Lead marked as Converted"
            });
        }
    );
});

// DELETE lead
app.delete("/leads/:id", (req, res) => {
    const id = req.params.id;

    db.run(
        "DELETE FROM leads WHERE id = ?",
        [id],
        function (err) {
            if (err) {
                return res.status(500).json({ error: err.message });
            }

            res.json({
                message: "Lead deleted successfully"
            });
        }
    );
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});