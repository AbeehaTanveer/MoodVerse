const express = require("express");
const { Signup, Signin } = require("../Controller/userController");
const userRoutes = express.Router();

// User Signup Route
userRoutes.post("/signup", Signup);

// User Signin Route
userRoutes.post("/signin", Signin);




module.exports = userRoutes;
