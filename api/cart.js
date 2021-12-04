const express = require("express");
const cartRouter = express.Router();

const jwt = require("jsonwebtoken");
const { addToCart, getCart } = require("../db");
const { JWT_SECRET = "neverTell" } = process.env;
const {requireUser} = require("./utilities");

cartRouter.post("/", async (req, res, next) => {
  try {
    const { productId, userId, quantity } = req.body;

    if (!productId || !userId || !quantity) {
      next({ message: "missing values" });
    } else {
      console.log("before cart backend api");
      const CART = await addToCart({ productId, userId, quantity });
      console.log(CART, "after cart api");
      res.send({ cart: CART });
    }
  } catch (error) {
    next(error);
  }
});

cartRouter.get("/", requireUser, async (req, res, next) => {
  try {
    const { id } = req.user;
    console.log(id, "backend api id");
    if (!id) {
      next({ message: "missing id" });
    } else {
      console.log("before getCart backend api");
      const CART = await getCart(id);
      console.log(CART, "after getCart api");
      res.send({ cart: CART });
    }
  } catch (error) {
    next(error);
  }
});

module.exports = cartRouter;
