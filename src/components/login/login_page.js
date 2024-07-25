import { useContext, useEffect, useRef, useState } from "react";
import "./login_page.css";
import login from "../images/vecteezy_cloud-computing-modern-flat-concept-for-web-banner-design_5879539.jpg";

import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Dash from "../DashBoard/Dash";
import { PopContext } from "../context/popupcontext";
import { ThreeDots } from "react-loader-spinner";
// import "jsonwebtoken"
// import jwt from "jsonwebtoken";

export default function Login() {
  const link = process.env.serv;

  const emailRef = useRef(null);
  const passRef = useRef(null);

  const { isLogged, setIsLogged } = useContext(PopContext);

  const [loginbtn, showLoginbtn] = useState(true);

  const navigate = useNavigate();

  const [err, setErr] = useState(false);
  const [errmsg, setErrmsg] = useState("");

  useEffect(() => {
    if (sessionStorage.getItem("Token")) {
      setIsLogged(true);
    } else {
      setIsLogged(false);
    }
  }, []);

  function getUser(e) {
    e.preventDefault();
    showLoginbtn(false);
    const obj = {};
    obj.Email = emailRef.current.value.trim();
    obj.Password = passRef.current.value.trim();

    console.log(obj);
    const apiUrl = "http://localhost:5000/sign_in";
    axios
      .post(apiUrl, obj, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        console.log(res.data.Token);
        showLoginbtn(true);
        setIsLogged(true);
        navigate("/dash");
        sessionStorage.setItem("Token", res.data.Token);
        sessionStorage.setItem("Email", obj.Email);
      })
      .catch((err) => {
        setErr(true);
        if (typeof err.response.data === "object") {
          console.log(err.response.data.Error);
          setErrmsg(err.response.data.Error);
        } else {
          console.log(err.response.data);
          showLoginbtn(true);
          setErrmsg(err.response.data);
        }
      });
  }

  if (isLogged) {
    return <Dash></Dash>;
  } else {
    return (
      <>
        <div className="login_body">
          {err ? (
            <div
              id="login_error"
              className="alert alert-danger login_error"
              role="alert"
            >
              {errmsg}
            </div>
          ) : (
            <span></span>
          )}

          <div className="login_img">
            <img src={login} />
          </div>

          <form onSubmit={getUser}>
            <input
              type="email"
              ref={emailRef}
              className="form-control input_fields"
              placeholder="Email"
              aria-label="Username"
              aria-describedby="basic-addon2"
              required
            />
            <input
              type="password"
              ref={passRef}
              className="form-control input_fields"
              placeholder="Password"
              aria-label="Password"
              aria-describedby="basic-addon2"
              required
            />

            {loginbtn ? (
              <input
                type="submit"
                className="btn btn-secondary input_fields log_btn"
                value="Log In"
              />
            ) : (
              <div className="login_loader">
                <ThreeDots
                  height="50"
                  width="50"
                  radius="9"
                  color="#2a265f"
                  ariaLabel="three-dots-loading"
                  wrapperStyle={{}}
                  wrapperClassName=""
                  visible={true}
                />
              </div>
            )}

            <div>
              <span>
                Dont have an account? <Link to="/signup">Sign up</Link>
              </span>
            </div>
          </form>
        </div>
      </>
    );
  }
}
