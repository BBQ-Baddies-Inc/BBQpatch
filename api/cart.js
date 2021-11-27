const express = require("express");
const cartRouter = express.Router();

const jwt = require("jsonwebtoken");
const { getAllProducts } = require("../db");
const { JWT_SECRET = "neverTell" } = process.env;

module.exports = cartRouter