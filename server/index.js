const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const database = require("./Database/database");
const userRoutes = require("./Route/userRoute");
const commentRoutes = require("./Route/commetRoutes");
const reflectionRoutes = require("./Route/reflectionRoute");

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.use("/api", userRoutes);
app.use("/api", commentRoutes);
app.use("/api/reflections", reflectionRoutes);

// connect db once
database().catch(err => console.error("DB connection error:", err));

module.exports = app;  // ✅ no app.listen on Vercel
