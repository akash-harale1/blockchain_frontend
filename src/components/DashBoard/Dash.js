import { useContext, useState } from "react";
import "./Dash.css";
import { PopContext } from "../context/popupcontext";
import { Outlet, useNavigate } from "react-router-dom";
import Login from "../login/login_page";
import { Link } from "react-router-dom";
import axios from "axios";
import { qrScanContext } from "../context/qrScanContext";
import { List, User, Plus, CaretDown, SignOut } from "phosphor-react";
import { ColorRing } from "react-loader-spinner";

export default function Dash() {
  const { isLogged, setIsLogged } = useContext(PopContext);
  const { setScan } = useContext(qrScanContext);

  const [drop, setDrop] = useState();
  const [show, setShow] = useState();

  async function fetchData() {
    const apiUrl = "http://localhost:5000/Event_details";

    axios
      .get(apiUrl, {
        headers: {
          Authorization: sessionStorage.getItem("Token"),
        },
      })
      .then((res) => {
        setDrop(res.data);
        setShow(true);
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function setEventId(event_id) {
    setScan(event_id);
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
        <div className="dash">
          <nav className="ver_nav">
            <div>
              <List size={16} />
            </div>

            <div>
              <Link className="ver_nav_links" to="/dash/profile">
                {/* Profile */}
                <User size={16} />
              </Link>
            </div>

            <div>
              <Link className="ver_nav_links" to="/dash/event">
                <Plus size={16} />
              </Link>
            </div>

            <div>
              <div onClick={fetchData} className="dropdown">
                <button
                  className="btn btn-secondary drop_icon"
                  type="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <CaretDown size={16} />
                </button>

                <ul className="dropdown-menu">
                  {show ? (
                    drop.map((obj) => {
                      return (
                        <li
                          key={obj._id}
                          onClick={() => {
                            setEventId(obj.EventId);
                          }}
                        >
                          <Link to="/dash/qrscan" className="dropdown-item">
                            {obj.EventName}
                          </Link>
                        </li>
                      );
                    })
                  ) : (
                    <ColorRing
                      visible={true}
                      height="40"
                      width="40"
                      ariaLabel="blocks-loading"
                      wrapperStyle={{}}
                      wrapperClass="blocks-wrapper"
                      colors={[
                        "#e15b64",
                        "#f47e60",
                        "#f8b26a",
                        "#abbd81",
                        "#849b87",
                      ]}
                    />
                  )}
                </ul>
              </div>
            </div>
            <div onClick={logOut}>
              <SignOut size={16} />
            </div>
          </nav>
          <div className="dash_body">
            <Outlet />
          </div>
        </div>

        {/* <button onClick={logOut}>LogOut</button> */}
      </>
    );
  } else {
    return <Login></Login>;
  }
}
