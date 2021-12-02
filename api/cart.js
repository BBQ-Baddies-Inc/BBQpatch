const express = require("express");
const cartRouter = express.Router();

const jwt = require("jsonwebtoken");
const { addToCart } = require("../db");
const { JWT_SECRET = "neverTell" } = process.env;

cartRouter.get("/", async (req, res, next) => {
try {
    const {productId, userId, quantity} = req.body
    console.log("before cart backend api")
    const CART = await addToCart({productId, userId, quantity})
    console.log(CART, "after cart api")
    res.send({cart: CART})
} catch (error) {
    next(error)
}
});

module.exports = cartRouter