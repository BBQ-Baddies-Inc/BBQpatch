const express = require("express");
const apiRouter = express.Router();

const jwt = require("jsonwebtoken");
const {JWT_SECRET = "neverTell"} = process.env
const userRouter = require("./users");


const {
  getUserById,
} = require("../db");
const cartRouter = require("./cart");

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

apiRouter.use('/cart', cartRouter)
apiRouter.use('/users', userRouter)
apiRouter.use('/products', require("./products"))

module.exports = apiRouter
