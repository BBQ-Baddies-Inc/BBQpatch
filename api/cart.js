const express = require("express");
const cartRouter = express.Router();

const jwt = require("jsonwebtoken");
const { getCart } = require("../db");
const { JWT_SECRET = "neverTell" } = process.env;

cartRouter.get("/", async (req, res, next) => {
try {
    console.log("before cart backend api")
    const CART = await getCart()
    console.log(CART, "after cart api")
    res.send({cart: CART})
} catch (error) {
    next(error)
}
});

module.exports = cartRouter