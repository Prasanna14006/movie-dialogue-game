const pool = require("../models/db");

exports.getRandomDialogue = async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT id, dialogue, hint FROM dialogues ORDER BY RANDOM() LIMIT 1"
    );
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};

exports.submitGuess = async (req, res) => {
  const { dialogueId, guess, userId } = req.body;
  try {
    const dialogue = await pool.query("SELECT * FROM dialogues WHERE id=$1", [dialogueId]);
    if (dialogue.rows.length === 0) return res.status(400).json({ error: "Dialogue not found" });

    let score = 0;
    if (dialogue.rows[0].movie_title.toLowerCase() === guess.toLowerCase()) {
      score = 10;
    }

    await pool.query(
      "INSERT INTO scores (user_id, dialogue_id, score) VALUES ($1,$2,$3)",
      [userId, dialogueId, score]
    );

    await pool.query("UPDATE users SET total_score = total_score + $1 WHERE id=$2", [
      score,
      userId,
    ]);

    res.json({ correct: score > 0, score });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};
