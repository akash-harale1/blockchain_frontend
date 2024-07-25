import { useContext } from "react";
import { Link } from "react-router-dom";
import { qrContext } from "../context/qrContext";
import "./Validatecard.css";

export default function ValidateCard({ img, eventName, token, id }) {
  const { setEventId, setTokenId } = useContext(qrContext);

  function setData() {
    setEventId(id);
    setTokenId(token);
  }

  return (
    <>
      <div className="card valid_card" style={{ width: "18rem" }}>
        <img src={img} className="card-img-top" alt="NFT" />
        <div className="card-body">
          <h5 className="card-title">Event : {eventName}</h5>
          <p className="card-text">Token : {token}</p>
          <p className="card-text">EventID : {id}</p>
          <button className="btn btn-secondary">
            <Link
              onClick={setData}
              style={{ color: "white", textDecoration: "none" }}
              to="/qr"
            >
              Generate QR
            </Link>
          </button>
        </div>
      </div>
    </>
  );
}
