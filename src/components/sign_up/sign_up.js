import "./signup.css";
import axios from "axios";
import validator from "validator";
import { useEffect, useRef, useState } from "react";
import Login from "../login/login_page";
import { ThreeDots } from "react-loader-spinner";

export default function SignUp() {
  const [loader, setLoader] = useState(false);
  const [signed, setSigned] = useState(false);

  const passref1 = useRef(null);
  const passref2 = useRef(null);
  const nameref = useRef(null);
  const emailref = useRef(null);
  const instaref = useRef(null);
  const faceref = useRef(null);
  const tweetref = useRef(null);
  const descref = useRef(null);

  const [data, setData] = useState({});

  const obj = {};

  const [valid, setValid] = useState(false);
  const [err, setErr] = useState("");

  function setFields(e) {
    e.preventDefault();
    setLoader(true);
    obj.Name = nameref.current.value.trim();
    obj.Email = emailref.current.value.trim();
    obj.Insta = instaref.current.value.trim();
    obj.Facebook = faceref.current.value.trim();
    obj.Twitter = tweetref.current.value.trim();
    obj.Description = descref.current.value.trim();
    obj.Password = passref2.current.value.trim();
    console.log(obj);
    const apiUrl = "http://localhost:5000/sign_up";
    axios
      .post(apiUrl, obj, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        console.log(res);
        setSigned(true);
      })
      .catch((err) => {
        console.log(err.response.data.error);
        setLoader(false);
        setValid(true);
        setErr(err.response.data.error);
      });
  }

  // function emailValidation() {
  //   validator.isEmail(emailref)
  // }

  function finalValid() {
    let pass1 = passref1.current.value.trim();
    let pass2 = passref2.current.value.trim();

    if (pass1 !== pass2) {
      setValid(true);
      setErr("password doesnt't match");
    }
  }

  if (signed) {
    return <Login></Login>;
  } else {
    return (
      <>
        <div className="sign_up_body">
          <form onSubmit={setFields}>
            <input
              type="text"
              className="form-control input_fields"
              ref={nameref}
              placeholder="Name"
              aria-label="Name"
              aria-describedby="basic-addon2"
              required
            />
            <input
              type="email"
              className="form-control input_fields"
              ref={emailref}
              // onBlur={emailValidation}
              placeholder="Email"
              aria-label="Email"
              aria-describedby="basic-addon2"
              required
            />

            <input
              type="text"
              className="form-control input_fields"
              ref={instaref}
              placeholder="Instagram handle"
              aria-label="Email"
              aria-describedby="basic-addon2"
              required
            />

            <input
              type="text"
              className="form-control input_fields"
              ref={faceref}
              placeholder="Facebook handle"
              aria-label="Email"
              aria-describedby="basic-addon2"
              required
            />

            <input
              type="text"
              className="form-control input_fields"
              ref={tweetref}
              placeholder="Twitter/x handle"
              aria-label="Email"
              aria-describedby="basic-addon2"
              required
            />

            <textarea
              placeholder="Describe yourself"
              ref={descref}
              className="form-control input_fields desc"
              aria-label="With textarea"
              required
            ></textarea>

            <input
              type="text"
              className="form-control input_fields"
              placeholder="Password"
              ref={passref1}
              aria-label="Email"
              aria-describedby="basic-addon2"
              required
            />

            <input
              type="text"
              className="form-control input_fields"
              placeholder="Confirm Password"
              ref={passref2}
              onBlur={finalValid}
              aria-label="Email"
              aria-describedby="basic-addon2"
              required
            />

            {valid ? (
              <div
                id="signup_error"
                className="alert alert-danger signup_error"
                role="alert"
              >
                {err}
              </div>
            ) : (
              <span></span>
            )}

            {loader ? (
              <div className="signup_loader">
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
            ) : (
              <input type="submit" className="btn btn-secondary input_fields" />
            )}
          </form>
        </div>
      </>
    );
  }
}
