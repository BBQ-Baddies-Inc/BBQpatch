const express = require("express");
const productRouter = express.Router();
const { isAdmin } = require("./utilities");

const jwt = require("jsonwebtoken");
const {
  getAllProducts,
  createProduct,
  updateProduct,
  removeProduct,
} = require("../db");
const { JWT_SECRET = "neverTell" } = process.env;

productRouter.get("/", async (req, res, next) => {
  try {
    const PRODUCTS = await getAllProducts();

    res.send({ products: PRODUCTS });
  } catch (error) {
    next(error);
  }
});

//UPDATE put or Patch
productRouter.put("/", isAdmin, async (req, res, next) => {
  try {
    const { id, name, price, category, photo, description, stock_data } =
      req.body;
    if (
      !id ||
      !name ||
      !price ||
      !category ||
      !photo ||
      !description ||
      !stock_data
    ) {
      next({
        message: "Missing Information",
      });
    } else {
      const productFound = await getProductById(id);
      if (!productFound.length) {
        next({
          message: "Product Does Not Exist",
        });
      } else {
        const updatedProduct = await updateProduct({
          id,
          name,
          price,
          category,
          photo,
          description,
          stock_data,
        });
        res.send(updatedProduct);
      }
    }
  } catch (error) {
    next(error);
  }
});

//delete
productRouter.delete("/", isAdmin, async (req, res, next) => {
  try {
    const { id } = req.body;

    if (!id) {
      next({
        message: "Please Enter a Product ID",
      });
    } else {
      const productFound = await getProductById(id);
      if (!productFound.length) {
        next({
          message: "Product Does Not Exist",
        });
      } else {
        const removedProduct = await removeProduct(id);
        res.send(removedProduct);
      }
    }
  } catch (error) {
    next(error);
  }
});

//create
productRouter.post("/", isAdmin, async (req, res, next) => {
  try {
    const { name, price, category, photo, description, stock_data } = req.body;
    if (!name || !price || !category || !photo || !description || !stock_data) {
      next({
        message: "Missing Information",
      });
    } else {
      const createdProduct = await createProduct({
        name,
        price,
        category,
        photo,
        description,
        stock_data,
      });
      res.send(createdProduct);
    }
  } catch (error) {
    next(error);
  }
});

module.exports = productRouter;
