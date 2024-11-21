const express = require("express");
const cors = require("cors");
const app = express();
app.use(express.json());
app.use(cors());
const {DB_Connection} =require("./database/Db.js");
const { route } = require("./Routes/route.js");

const PORT = process.env.PORT || 8001;

app.use("/api",route)


// app.get("/",(req, res) => {
//   console.log("Hello World");
//   res.status(200).json(req.body);
// });


app.get("/", (req, res) => {
  console.log("Hello World");
  res.status(200).json({ message: "Welcome to the API" });
});

DB_Connection()
try {
  app.listen(PORT, () => {
    console.log(`App is listening on port ${PORT}`);
  });
} catch (error) {
  console.error("Error starting the server:", error.message);
}
