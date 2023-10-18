import { useContext } from "react";
import "./Dash.css";
import { PopContext } from "../context/popupcontext";
import { Outlet, useNavigate } from "react-router-dom";
import Login from "../login/login_page";
import { Link } from "react-router-dom";
import Card from "../card/card";

export default function Dash() {
  const { isLogged, setIsLogged } = useContext(PopContext);

  function storeData() {
    // sessionStorage.setItem("Akash", 1);
  }
  const navigate = useNavigate();
  function logOut() {
    sessionStorage.clear();
    navigate("/login");
    setIsLogged(false);
  }

  if (isLogged) {
    return (
      <>
        <nav className="ver_nav">
          <div>
            <Link to="/dash/profile">Profile</Link>
          </div>
          <div>
            <Link to="/dash/event">Create Event</Link>
          </div>
          <div onClick={logOut}>Logout</div>
        </nav>
        <div className="dash_body">
          <Outlet />
        </div>

        {/* <button onClick={logOut}>LogOut</button> */}
      </>
    );
  } else {
    return <Login></Login>;
  }
}
