const express = require("express");
const router = express.Router();
const { getRandomDialogue, submitGuess } = require("../controllers/dialogueController");
const { authenticate } = require("../middleware/authMiddleware");

router.get("/dialogue", authenticate, getRandomDialogue);
router.post("/guess", authenticate, submitGuess);

module.exports = router;
