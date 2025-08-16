const mongoose = require("mongoose");

const database = () => {
  mongoose.connect(process.env.MONGO_URL);

  mongoose.connection.on("connected", () => {
    console.log("Database connected successfully");
  });
  mongoose.connection.on("error", () => {
    console.log("Error connecting to database");
  });
};

module.exports = database;
