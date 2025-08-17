const express = require("express");
const refelctionRoute = express.Router();

const { getReflections, createReflection } = require("../Controller/reflectionController");



refelctionRoute.get("/", getReflections);
refelctionRoute.post("/",createReflection);

module.exports = refelctionRoute;
