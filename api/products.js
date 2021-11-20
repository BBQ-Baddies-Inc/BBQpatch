const express = require("express");
const productRouter = express.Router();

const jwt = require("jsonwebtoken");
const { getAllProducts } = require("../db");
const { JWT_SECRET = "neverTell" } = process.env;

productRouter.get("/", async (req, res, next) => {
    try {
        console.log("before products api")
        const PRODUCTS = await getAllProducts();
        console.log(PRODUCTS, "here is backend API")
        res.send({products: PRODUCTS});

    } catch (error) {
        next(error);
    }
});

module.exports = productRouter
