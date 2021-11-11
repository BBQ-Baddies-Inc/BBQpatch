import React from "react";
import ReactDOM from "react-dom";

import {
  BrowserRouter as Router
} from "react-router-dom";
import {Navbar} from "./components";

const App = () => {

  return (
<div id="app">
<Navbar/>

</div>
  );
}

ReactDOM.render(
  <Router>
    <App />
  </Router>,
  document.getElementById("root")
);