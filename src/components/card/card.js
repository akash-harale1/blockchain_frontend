import { useEffect, useState } from "react";
import pfp from "../images/pfp.jpg";

export default function Card() {
  const [email, setEmail] = useState();

  useEffect(() => {
    setEmail(sessionStorage.getItem("Email"));
  }, []);

  return (
    <>
      <div className="card" style={{ width: "70%", margin: "0 auto 0 auto" }}>
        <div className="card-body">
          {/* <div className="card-img" style={{ width: "90%", height: "" }}>
            <img
              style={{ width: "100%", height: "100%" }}
              className=""
              src={pfp}
            />
          </div> */}
          <h5
            className="card-title"
            style={{ fontWeight: "bold", textAlign: "center" }}
          >
            Welcome Back
          </h5>
          <h6
            className="card-subtitle mb-2 text-muted"
            style={{ textAlign: "center" }}
          >
            {email}
          </h6>
          {/* <p className="card-text">
            Some quick example text to build on the card title and make up the
            bulk of the card's content.
          </p> */}
        </div>
      </div>
    </>
  );
}
