import React, { useState } from "react";
import ReactDOM from "react-dom";

import { BrowserRouter as Router } from "react-router-dom";
import { Login, Register, Navbar } from "./components";
import { Switch , Route} from "react-router";

const App = () => {
const [userName, setUserName] = useState("");
const [isLoggedIn, setIsLoggedIn] = useState(false);


  return (
    <div id="app">
      <Navbar />
      <Switch>
        <Route path="/login">
          <Login
            userName={userName}
            setUserName={setUserName}
            setIsLoggedIn={setIsLoggedIn}
            isLoggedIn={isLoggedIn}
          />
        </Route>
        <Route path="/register">
          <Register setIsLoggedIn={setIsLoggedIn} />
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
