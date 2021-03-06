import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { getToken } from "./auth";

import { BrowserRouter as Router } from "react-router-dom";
import {
  Login,
  Register,
  Navbar,
  Products,
  Admin,
  LandingScreen,
  Cart,
  MainProductPage,
  Checkout,
} from "./components";
import { Switch, Route } from "react-router";

const App = () => {
  const [userName, setUserName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [address, setAddress] = useState("");
  const [emailAddress, setEmailAddress] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [products, setProducts] = useState([]);
  const [productId, setProductId] = useState("");

  useEffect(() => {
    const TOKEN = getToken();
    if (TOKEN) {
      setIsLoggedIn(true);
    }
  }, []);

  return (
    <div id="app">
      <Navbar
        isLoggedIn={isLoggedIn}
        setIsLoggedIn={setIsLoggedIn}
        isAdmin={isAdmin}
        setIsAdmin={setIsAdmin}
      />
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
          <Register
            userName={userName}
            setUserName={setUserName}
            firstName={firstName}
            setFirstName={setFirstName}
            lastName={lastName}
            setLastName={setLastName}
            address={address}
            setAddress={setAddress}
            emailAddress={emailAddress}
            setEmailAddress={setEmailAddress}
            setIsLoggedIn={setIsLoggedIn}
          />
        </Route>
        <Route path="/products">
          <Products
            products={products}
            setProducts={setProducts}
            setProductId={setProductId}
          />
        </Route>

        <Route path="/admin">
          <Admin />
        </Route>
        
        <Route path="/cart">
          <Cart setProductId={setProductId} />
        </Route>
        <Route path="/checkout">
          <Checkout />
        </Route>
        <Route path="/product/:id">
          <MainProductPage
            products={products}
            setProducts={setProducts}
            productId={productId}
            setProductId={setProductId}
          />
        </Route>
        <Route path="/">
          <LandingScreen
            products={products}
            setProducts={setProducts}
            image5="https://anima-uploads.s3.amazonaws.com/projects/61a27368a28b3fe153421fed/releases/61a27df2b025b40396416fc4/img/image-5@1x.png"
            text1="Create the best ribs"
            text2="These state-of-the-art grills allow you to monitor your food from your smart device so you can spend more time enjoying company or watching the game"
            title="BBQ Baddies"
            fromThePatch="from the patch"
          />
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
