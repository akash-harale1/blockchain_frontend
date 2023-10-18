import { Link } from "react-router-dom";
import "./Navbar.css";
import logo from "../images/logo.jfif";
import { useContext, useEffect } from "react";
import { PopContext } from "../context/popupcontext";
import { UserCircle, House, Wallet, SignOut } from "phosphor-react";

export default function Navbar() {
  const { pop, setPop, metaConnect, isLogged } = useContext(PopContext);

  const openPopUp = () => {
    setPop(true);
  };

  useEffect(() => {
    if (pop) {
      const temp = document.getElementById("main_body");
      temp.setAttribute("class", "hide_body");

      console.log(temp);
    }
  }, [pop]);

  return (
    //navbar-expand-lg bg-body-tertiary
    <>
      <nav className="navbar  main_nav">
        {/* <a className="navbar-brand logo_body">
          <img src={logo} />
        </a> */}
        <div className="nav-item">
          <Link className="nav-link" to="/home">
            <House size={28} />
          </Link>
        </div>
        <div className="nav-item">
          <Link className="nav-link">Features</Link>
        </div>
        <div className="nav-item">
          <Link className="nav-link">Pricing</Link>
        </div>

        <div onClick={openPopUp} className="btn nav_btn">
          <Wallet style={{ color: "white" }} size={28} />
        </div>
        <div className=" nav-item">
          <Link className="nav-link" to={isLogged ? "/dash" : "/login"}>
            <UserCircle size={28} />
          </Link>
        </div>
      </nav>
    </>
  );
}
