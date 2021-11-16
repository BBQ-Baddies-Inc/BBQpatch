import React, { useState } from "react";
import { registerUser } from "../api/users";
import { storeToken, storeUserName } from "../auth";

export default function Register(props) {
    const { userName, setIsLoggedIn, setUserName } = props;
  const [password, setPassword] = useState("");

  return (
    <form
      className="login-form"
      onSubmit={async (event) => {
        event.preventDefault();

        try {
          console.log(userName, password, "passed in data_______")
          const results = await registerUser(userName, password);
          console.log(results, "!!!!!!!!!!");
          storeToken(results.token);
          
          setIsLoggedIn(true);
          storeUserName(userName)
          setUserName("");
          setPassword("");
          // history.push("/routines");
          alert("You are registered!");
        } catch (error) {
          console.log(error);
        }
      }}
    >
      <div className="container">
        <h1 className="login-title">Register</h1>
        <div className="imgcontainer">
          <i className="far fa-user fa-5x"></i>
        </div>
        <p>Please fill in this form to create an account.</p>
        <>
          <div className="registerUsername">
            <label htmlFor="email">
              <b>Username:</b>
            </label>
            <input
              type="text"
              placeholder="Enter Username"
              name=""
              id="email"
              required
              value={userName}
              onChange={(event) => {
                console.log(event.target.value, "username")
                setUserName(event.target.value);
              }}
            />
          </div>
          <label htmlFor="psw">
            <b>Password</b>
          </label>
          <input
            type="password"
            placeholder="Enter Password"
            name="psw"
            id="psw"
            required
          />

          <label htmlFor="psw-repeat">
            <b>Repeat Password</b>
          </label>
          <input
            type="password"
            placeholder="Repeat Password"
            name="psw-repeat"
            id="psw-repeat"
            required
            value={password}
            onChange={(event) => {
              console.log(event.target.value, "password")
              setPassword(event.target.value);
            }}
          />
        </>

        <button type="submit" className="registerbtn">
          Register
        </button>
      </div>

      <div className="container signin">
        <p>
          Already have an account? <a href="/login">Sign in</a>.
        </p>
      </div>
    </form>
  );
}