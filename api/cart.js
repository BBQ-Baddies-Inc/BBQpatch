const express = require("express");
const cartRouter = express.Router();

const jwt = require("jsonwebtoken");
const { addToCart, getCart, destroyCartItem } = require("../db");
const { JWT_SECRET = "neverTell" } = process.env;
const { requireUser } = require("./utilities");

cartRouter.post("/", async (req, res, next) => {
  try {
    const { productId, userId, quantity } = req.body;

    if (!productId || !userId || !quantity) {
      next({ message: "missing values" });
    } else {
      const CART = await addToCart({ productId, userId, quantity });

      res.send({ cart: CART });
    }
  } catch (error) {
    next(error);
  }
});

cartRouter.get("/", requireUser, async (req, res, next) => {
  try {
    const { id } = req.user;

    if (!id) {
      next({ message: "missing id" });
    } else {
      const CART = await getCart(id);

      res.send({ cart: CART });
    }
  } catch (error) {
    next(error);
  }
});

cartRouter.delete("/", requireUser, async (req, res, next) => {
  const { id: userId } = req.user;
  const { productId } = req.body;

  try {
    const [{ cartId: currentCart }] = await getCart(userId);

    const deletedItem = await destroyCartItem(productId, currentCart);

    if (deletedItem) {
      res.send(deletedItem);
    } else {
      next({
        name: "Cannot Delete",
        message: "Permission not granted",
      });
    }
  } catch ({ name, message }) {
    next({ name, message });
  }
});

module.exports = cartRouter;
