const express = require("express");
const userRouter = express.Router();

const jwt = require("jsonwebtoken");
const { JWT_SECRET = "neverTell" } = process.env;

const {
  createUser,
  getUserByUsername,
  getUser,
  getUserById,
  getAllUsers
  
} = require("../db");
const requireUser = require("./utilities");

userRouter.post("/register", async (req, res, next) => {
  const { username, password } = req.body;

  try {
    const user = await getUserByUsername(username);

    if (user) {
      next({
        name: "UserExistsError",
        message: "Username already exists",
      });
    } else if (password.length < 8) {
      next({
        name: "PasswordTooShortError",
        message: "Password must contain at least 8 characters",
      });
    } else {
      const user = await createUser({ username, password });
      const token = jwt.sign(
        { id: user.id, username: user.username },
        JWT_SECRET,
        { expiresIn: "1w" }
      );
      res.send({ user, token, message: "You're logged in" });
    }
  } catch (error) {
    next(error);
  }
});

userRouter.post("/login", async (req, res, next) => {
  const { username, password } = req.body;

  try {
    if (!username || !password) {
      next({
        message: "Incorrect username or password",
      });
    } else {
      const user = await getUser({ username, password });
      const token = jwt.sign(
        { id: user.id, username: user.username },
        JWT_SECRET,
        { expiresIn: "1w" }
      );
      res.send({ user, token, message: "You're logged in" });
    }
  } catch (error) {
    next(error);
  }
});

userRouter.get("/me", requireUser, async (req, res, next) => {
  try {
    res.send(req.user);
  } catch (error) {
    next(error);
  }
});

userRouter.get("/", requireUser, async(req, res, next)=>{
  try{
    console.log(req.user)
    if (req.user.admin){
     const usersLists = await getAllUsers()
     console.log(usersLists, "USER LIST")
     res.send(usersLists)
    }else{
      next({
        message: "You Are Unauthorized"
      })
    } 
      
  }catch(error){
  next(error)
  }
})

module.exports = userRouter