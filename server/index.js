const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const database = require("./Database/database");
const userRoutes = require("./Route/userRoute");
const commentRoutes = require("./Route/commetRoutes");
const reflectionRoutes = require("./Route/reflectionRoute");

require('dotenv').config({ quiet: true });

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.use("/api", userRoutes);
app.use("/api", commentRoutes);
app.use("/api/reflections", reflectionRoutes);

// Connect to database with proper error handling
(async () => {
  try {
    await database();
    console.log("Database connected successfully");
  } catch (err) {
    console.error("DB connection error:", err);
  }
})();

// ✅ Export a handler instead of the app
module.exports = (req, res) => {
  app(req, res);
};
