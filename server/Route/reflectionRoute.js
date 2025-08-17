const express = require("express");
const refelctionRoute = express.Router();

const { getReflections, createReflection } = require("../Controller/reflectionController");
const { verifyToken } = require("../Middleware/authMiddleware");



refelctionRoute.get("/", verifyToken, getReflections);
refelctionRoute.post("/",createReflection);

module.exports = refelctionRoute;
