// routes/reflectionRoutes.js
const express = require('express');
const refelctionRoute = express.Router();


const protect = require('../middleware/authMiddleware'); // optional if using auth
const { getReflections, createReflection } = require('../Controller/reflectionController');
const verifyToken = require('../middleware/authMiddleware');

refelctionRoute.get('/',verifyToken, getReflections);
refelctionRoute.post('/', verifyToken, createReflection); // protect is optional

module.exports = refelctionRoute;
