import React from "react";
import { Link, useHistory } from "react-router-dom";
import { clearCurrentToken, clearUserName, clearUserId } from "../auth";

export default function Navbar(props) {
  const { isLoggedIn, setIsLoggedIn, isAdmin, setIsAdmin } = props;
  let history = useHistory();

  return (
    <nav className="navbar">
      <div>
        <Link className="links" to="/">
          Home
        </Link>
        <Link className="links" to="/products">
          Products
        </Link>
        <Link className="links" to="/cart">
          Cart
        </Link>

        <Link className="links" to="/mybbq">
          Account
        </Link>
        {isAdmin ? (
          <Link className="links" to="/admin">
            Admin
          </Link>
        ) : null}

        {isLoggedIn ? (
          <Link
            className="links"
            to="/login"
            onClick={(event) => {
              // const course = confirm("Are you sure you want to log out?");

              // if (course === true) {
              event.preventDefault();
              clearCurrentToken();
              clearUserName();
              clearUserId();
              setIsLoggedIn(false);
              setIsAdmin(false);
              history.push("/login");
              // }
            }}
          >
            LogOut
          </Link>
        ) : (
          <Link className="links" to="/login">
            Login/SignUp
          </Link>
        )}
      </div>
    </nav>
  );
}
