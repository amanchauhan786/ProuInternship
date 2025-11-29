// server/server.js
const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// 1. Database Setup (SQLite)
// This creates a file named 'database.sqlite' automatically
const db = new sqlite3.Database('./database.sqlite', (err) => {
    if (err) console.error(err.message);
    else console.log('Connected to the SQLite database.');
});

// Create Tables for Employees and Tasks
db.serialize(() => {
    // Employee Table
    db.run(`CREATE TABLE IF NOT EXISTS employees (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT,
        role TEXT,
        email TEXT
    )`);
    
    // Task Table
    db.run(`CREATE TABLE IF NOT EXISTS tasks (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT,
        description TEXT,
        assignedTo INTEGER,
        FOREIGN KEY(assignedTo) REFERENCES employees(id)
    )`);
});

// 2. API Routes (CRUD Operations)

// --- Employees ---
// GET all employees
app.get('/api/employees', (req, res) => {
    db.all("SELECT * FROM employees", [], (err, rows) => {
        if (err) return res.status(400).json({ error: err.message });
        res.json(rows);
    });
});

// POST new employee
app.post('/api/employees', (req, res) => {
    const { name, role, email } = req.body;
    db.run("INSERT INTO employees (name, role, email) VALUES (?, ?, ?)", 
        [name, role, email], 
        function(err) {
            if (err) return res.status(400).json({ error: err.message });
            res.json({ id: this.lastID, name, role, email });
        }
    );
});

// --- Tasks ---
// GET all tasks
app.get('/api/tasks', (req, res) => {
    db.all("SELECT * FROM tasks", [], (err, rows) => {
        if (err) return res.status(400).json({ error: err.message });
        res.json(rows);
    });
});

// POST new task
app.post('/api/tasks', (req, res) => {
    const { title, description, assignedTo } = req.body;
    db.run("INSERT INTO tasks (title, description, assignedTo) VALUES (?, ?, ?)", 
        [title, description, assignedTo], 
        function(err) {
            if (err) return res.status(400).json({ error: err.message });
            res.json({ id: this.lastID, title, description, assignedTo });
        }
    );
});
// --- Delete Routes ---

// DELETE Employee
app.delete('/api/employees/:id', (req, res) => {
    const id = req.params.id;
    db.run("DELETE FROM employees WHERE id = ?", id, function(err) {
        if (err) return res.status(400).json({ error: err.message });
        res.json({ message: "Deleted", changes: this.changes });
    });
});

// DELETE Task
app.delete('/api/tasks/:id', (req, res) => {
    const id = req.params.id;
    db.run("DELETE FROM tasks WHERE id = ?", id, function(err) {
        if (err) return res.status(400).json({ error: err.message });
        res.json({ message: "Deleted", changes: this.changes });
    });
});
// PUT (Update) Task Status
app.put('/api/tasks/:id', (req, res) => {
    const { status } = req.body;
    db.run("UPDATE tasks SET description = ? WHERE id = ?", [status, req.params.id], function(err) {
        if (err) return res.status(400).json({ error: err.message });
        res.json({ message: "Updated" });
    });
});
// Start Server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});