import React, { useState, useEffect } from "react";

import { loginUser, getAllUsers } from "../api/users";
import { storeToken, storeUserName } from "../auth";

export default function Login(props) {
  const { userName, isLoggedIn, setUserName, setIsAdmin, setIsLoggedIn } =
    props;
  const [password, setPassword] = useState("");
  const [adminUsers, setAdminUsers] = useState([]);

  const fetchAllUsers = async () => {
    const allUsers = await getAllUsers();
    setAdminUsers(allUsers);
  };
  useEffect(() => {
    fetchAllUsers();
  }, []);

  // function administrator () {
  //   const ADMINLIST = [];
  //   const ADMIN = adminUsers.filter((user) => user.admin === true);
    
  //   ADMIN.map((admin) => {
    
  //     ADMINLIST.push(admin.username)
      
  //   });
  //   return
  // }

  if (!isLoggedIn) {
    return (
      <form
        className="login-form"
        onSubmit={async (event) => {
          event.preventDefault();
          // if (ADMINLIST.includes(userName)) {
          //   setIsAdmin(true);
          // }

          try {
            const results = await loginUser(userName, password);
            console.log(results, "!!!!!!");
            storeToken(results.token);
            storeUserName(userName);
            setIsLoggedIn(true);
            setPassword("");
            // console.
            if(results.user.admin){
              setIsAdmin(true)
            }

            alert(`${results.message}`);
          } catch (error) {
            console.log(error);
          } finally {
            //  await administrator();
          }
        }}
      >
        <h1 className="login-title">
          {" "}
          <span>Athelete Login</span>
        </h1>
        <div className="imgcontainer">
          <i className="far fa-user fa-5x"></i>
        </div>

        <div className="login-container">
          <div className="usernameLogin">
            <label htmlFor="uname">
              <b>Username:</b>
            </label>
            <input
              type="text"
              placeholder="Enter Username"
              name="uname"
              required
              value={userName}
              onChange={(event) => {
                setUserName(event.target.value);
              }}
            />
          </div>
          <div className="passwordLogin">
            <label htmlFor="psw">
              <b>Password: </b>
            </label>
            <input
              type="password"
              placeholder="Enter Password"
              name="psw"
              required
              value={password}
              onChange={(event) => {
                setPassword(event.target.value);
              }}
            />
          </div>
          <button className="submit-button" type="submit">
            Login
          </button>
          <label className="checkbox">
            <input type="checkbox" name="remember" /> Remember me
          </label>
          Have you created an Account?<a href="/register"> Sign up here.</a>
        </div>
      </form>
    );
  } else {
    return null;
  }
}
