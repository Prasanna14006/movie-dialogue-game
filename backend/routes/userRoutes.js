const express = require("express");
const router = express.Router();
const { register, login, leaderboard } = require("../controllers/userController");

router.post("/register", register);
router.post("/login", login);
router.get("/leaderboard", leaderboard);

module.exports = router;
