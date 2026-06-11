const express = require("express");
const cors = require("cors");
const userRoutes = require("./routes/userRoutes");
const dialogueRoutes = require("./routes/dialogueRoutes");

const app = express();
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/users", userRoutes);
app.use("/api", dialogueRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Backend running on port ${PORT}`));
