const express = require("express");
const app = express();

const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const database = require("./Database/database");
const userRoutes = require("./Route/userRoute");
const commentRoutes = require("./Route/commetRoutes");
const reflectionRoutes = require("./Route/reflectionRoute");

dotenv.config();

const PORT = process.env.PORT || 5000;
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("hello World ");
});


app.use("/api", userRoutes);
app.use("/api", commentRoutes);
app.use("/api/reflections", reflectionRoutes);

app.listen(PORT, () => {
  try {
    database();
  } catch (error) {
    coonole.error("Error connecting to the database:", error);
  }

  console.log(`Server is running on port ${PORT}`);
});
