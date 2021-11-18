const express = require("express");
const productRouter = express.Router();

const jwt = require("jsonwebtoken");
const { getAllProducts } = require("../db/products");
const { JWT_SECRET = "neverTell" } = process.env;

productRouter.get("/products", async (req, res, next) => {
    try {
        const PRODUCTS = await getAllProducts();
        res.send({products: PRODUCTS});

    } catch (error) {
        next(error);
    }
});
