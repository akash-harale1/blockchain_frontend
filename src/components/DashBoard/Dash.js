import { useContext } from "react";
import "./Dash.css";
import { PopContext } from "../context/popupcontext";
import { useNavigate } from "react-router-dom";
import Login from "../login/login_page";
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
          <div>One</div>
          <div>Two</div>
          <div onClick={logOut}>Logout</div>
        </nav>
        <div className="dash_body">
          <h3>Welcome Back</h3>
          <Card></Card>
        </div>

        {/* <button onClick={logOut}>LogOut</button> */}
      </>
    );
  } else {
    return <Login></Login>;
  }
}
