import React, { useEffect, useState } from "react";

import { loginUser } from "../api/users";
import { storeToken, getToken, storeUserName } from "../auth";
import { useHistory } from "react-router-dom";

export default function Login(props) {
  const { userName, isLoggedIn, setUserName, setIsLoggedIn } = props;
  const [password, setPassword] = useState("");

  const history = useHistory();

  useEffect(() => {
    const TOKEN = getToken();
    if (TOKEN) {
        setIsLoggedIn(true);
      }
  }, []);
  
  if (isLoggedIn === false) {
    return (
      <form
        className="login-form"
        onSubmit={async (event) => {
          event.preventDefault();

          try {
            const results = await loginUser(userName, password);
            console.log(results.message, "!!!!!!");
            storeToken(results.token);
            storeUserName(userName);
            setIsLoggedIn(true);
            setPassword("");

            history.push("/myroutines");

            alert(`${results.message}`);
          } catch (error) {
            console.log(error);
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
