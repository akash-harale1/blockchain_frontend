import "./signup.css";
import axios from "axios";
import validator from "validator";
import { useEffect, useRef, useState } from "react";

export default function SignUp() {
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

  const [valid, setValid] = useState(true);
  const [err, setErr] = useState("");

  // function sendReq() {
  //   const apiUrl = "http://localhost:5000/sign_up";
  //   axios
  //     .post(apiUrl, tempData, {
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //     })
  //     .then((res) => {
  //       if (res.status === 400) {
  //         // setErr(res.data);
  //         // console.log(res.data.error);
  //       }
  //     })
  //     .catch((err) => {
  //       console.log(err.response.data.error);
  //       setValid(false);
  //       setErr(err.response.data.error);
  //     });
  // }

  function setFields(e) {
    e.preventDefault();
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
      })
      .catch((err) => {
        console.log(err.response.data.error);
        setValid(false);
        setErr(err.response.data.error);
      });
  }

  // function emailValidation() {
  //   validator.isEmail(emailref)
  // }

  function finalValid() {
    let pass1 = passref1.current.value.trim();
    let pass2 = passref2.current.value.trim();

    if (pass1 === pass2) {
      // if (pass1.length < 8) {
      //   setErr(
      //     "Password should be at least 8 character long and should contain alpha numeric characters"
      //   );

      //   setValid(false);
      //   return;
      // }
      setValid(true);
    } else {
      setErr("password doesnt't matches");
      setValid(false);
    }
  }

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
            <span></span>
          ) : (
            <span style={{ color: "red", marginTop: "0.5rem" }}>{err} 😔</span>
          )}

          <input type="submit" className="btn btn-secondary input_fields" />
        </form>
      </div>
    </>
  );
}
