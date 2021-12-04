const express = require("express");
const cartRouter = express.Router();

const jwt = require("jsonwebtoken");
const { addToCart, getCart, destroyCartItem } = require("../db");
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

cartRouter.delete("/", requireUser, async (req, res, next) => {
    const { id: userId } = req.user;
    const { productId } = req.body
    console.log(req.params)
    try {

        const [{cartId: currentCart}] = await getCart(userId);
    console.log(currentCart, "currentCart backend api")
            const deletedItem = await destroyCartItem(productId, currentCart);
            console.log(deletedItem, "DELETED!")
            if(deletedItem){
                res.send(deletedItem);
            } else {
                next({
                    name: 'Cannot Delete',
                    message: 'Permission not granted',
                });
            }
        
    } catch ({ name, message }) {
        next({ name, message });
    }
});



module.exports = cartRouter;
