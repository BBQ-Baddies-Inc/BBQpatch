import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import {getToken} from "./auth"

import { BrowserRouter as Router } from "react-router-dom";
import { Login, Register, Navbar, Products, Users } from "./components";
import { Switch , Route} from "react-router";

const App = () => {
const [userName, setUserName] = useState("");
const [isLoggedIn, setIsLoggedIn] = useState(false);
const [isAdmin, setIsAdmin] = useState(false);

useEffect(() => {
  const TOKEN = getToken();
  if (TOKEN) {
      setIsLoggedIn(true);
    }
}, []);



  return (
    <div id="app">
      <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} isAdmin={isAdmin}/>
      <Switch>
        <Route path="/login">
          <Login
            userName={userName}
            setUserName={setUserName}
            setIsLoggedIn={setIsLoggedIn}
            isLoggedIn={isLoggedIn}
            setIsAdmin={setIsAdmin}
            
          />
        </Route>
        <Route path="/register">
          <Register userName={userName} setUserName={setUserName} setIsLoggedIn={setIsLoggedIn} />
        </Route>
        <Route path="/products">
          <Products />
        </Route>

          <Route path="/admin">
            <Users />
        </Route>

      </Switch>
    </div>
  );
};

ReactDOM.render(
  <Router>
    <App />
  </Router>,
  document.getElementById("root")
);
