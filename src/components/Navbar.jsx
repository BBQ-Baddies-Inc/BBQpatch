import React from "react";
import { Link } from "react-router-dom";
import { clearCurrentUser, clearUserName} from "../auth";

export default function Navbar(props) {
  const { isLoggedIn, setIsLoggedIn, isAdmin } = props

  // const [personalData, setPersonalData] = useState([])

  // useEffect(async () => {

  // }, []);
console.log(isAdmin, "ADMIN")
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
        {isAdmin === true ? <Link className="links" to="/admin">
        
        Admin
        </Link> : null}
       
        {isLoggedIn ? (
          <Link
            className="links"
            to="/login"
            onClick={(event) => {
              // const course = confirm("Are you sure you want to log out?");

              // if (course === true) {
                event.preventDefault();
                clearCurrentUser();
                clearUserName();
                setIsLoggedIn(false);
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
