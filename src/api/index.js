import axios from 'axios';

export async function getSomething() {
  try {
    const { data } = await axios.get('/api');
    return data;
  } catch (error) {
    throw error;
  }
}

//Users
// export async function LoginUser()
// export async function Register()
// export async function Users()
// export async function EditUser()
// export async function fetchProfile()
const userRouter = require('../src/api/users')
const express = require("express");
const apiRouter = express.Router();
const jwt = require("jsonwebtoken");
const {JWT_SECRET = "neverTell"} = process.env
const userRouter = require("./users");

const {
  getUserById,
} = require("../db")

apiRouter.get('/health', async (req, res)=>{
  try{
    res.send({message:"connected!"})
  }catch(error){
      console.error(error);
      next(error)
  }
});

apiRouter.use(async (req, res, next) => {
  const prefix = 'Bearer ';
  const auth = req.header('Authorization');
  
  if (!auth) { 
    next();
  } else if (auth.startsWith(prefix)) {
    const token = auth.slice(prefix.length);
    
    try {
      const parsedToken = jwt.verify(token, JWT_SECRET);
      
      const id = parsedToken && parsedToken.id
      if (id) {
        req.user = await getUserById(id);
        next();
      }
    } catch (error) {
      next(error);
    }
  } else {
    next({
      name: 'AuthorizationHeaderError',
      message: `Authorization token must start with ${ prefix }`
    });
  }
});

apiRouter.use('./users', userRouter)


// Products

// export async function Catalog()
// export async function ProductInfo()
// export async function addToCart()

//Cart

// export async function getCart()
// export async function updateCart()
// export async function deleteProductInCart()
// export async function getProductById()

//Checkout

// export async function checkout()
// export async function payment();
// export async function confirmPurchase()

module.exports = apiRouter