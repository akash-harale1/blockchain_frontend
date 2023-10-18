import { useContext, useEffect, useRef, useState } from "react";
import "./login_page.css";

import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Dash from "../DashBoard/Dash";
import { PopContext } from "../context/popupcontext";
// import "jsonwebtoken"
// import jwt from "jsonwebtoken";

export default function Login() {
  const link = process.env.serv;

  const emailRef = useRef(null);
  const passRef = useRef(null);

  const { isLogged, setIsLogged } = useContext(PopContext);

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
        setIsLogged(true);
        navigate("/dash");
        sessionStorage.setItem("Token", res.data.Token);
      })
      .catch((err) => {
        setErr(true);
        console.log(err);
        setErrmsg(err.response.data.Error);
      });
  }

  if (isLogged) {
    return <Dash></Dash>;
  } else {
    return (
      <>
        <div className="login_body">
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
              type="text"
              ref={passRef}
              className="form-control input_fields"
              placeholder="Password"
              aria-label="Password"
              aria-describedby="basic-addon2"
              required
            />

            <input
              type="submit"
              className="btn btn-secondary input_fields log_btn"
              value="Log In"
            />

            {err ? (
              <span style={{ color: "red" }}>*{errmsg}😔</span>
            ) : (
              <span></span>
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
