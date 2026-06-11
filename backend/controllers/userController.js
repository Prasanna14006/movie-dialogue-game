const pool = require("../models/db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.register = async (req, res) => {
  const { username, password } = req.body;
  try {
    const hashed = await bcrypt.hash(password, 10);
    await pool.query("INSERT INTO users (username, password) VALUES ($1, $2)", [
      username,
      hashed,
    ]);
    res.json({ message: "User registered!" });
  } catch (err) {
    res.status(400).json({ error: "Username already exists" });
  }
};

exports.login = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await pool.query("SELECT * FROM users WHERE username=$1", [username]);
    if (user.rows.length === 0) return res.status(400).json({ error: "No user found" });

    const match = await bcrypt.compare(password, user.rows[0].password);
    if (!match) return res.status(400).json({ error: "Wrong password" });

    const token = jwt.sign({ id: user.rows[0].id }, process.env.JWT_SECRET);
    res.json({ token });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};

exports.leaderboard = async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT username, total_score FROM users ORDER BY total_score DESC LIMIT 10"
    );
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};
