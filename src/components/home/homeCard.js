import { LineWave, MutatingDots, ThreeDots } from "react-loader-spinner";
import "./homeCard.css";

export default function HomeCard({
  eventName,
  eventID,
  desc,
  date,
  from,
  to,
  location,
  name,
  email,
  price,
  remaining,
  purchase,
  id,
  ipfsLink,
  loader,
}) {
  const timeZone = "Asia/Kolkata";
  date = new Date(date);

  const curr_date = new Date(
    Date.UTC(date.getFullYear(), date.getMonth() + 1, date.getDate())
  );

  const localDate = new Intl.DateTimeFormat("en-IN", timeZone).format(
    curr_date
  );

  from = new Date(from);
  to = new Date(to);

  return (
    <>
      <div className="card home_cards" style={{ width: "18rem" }}>
        <div className="card-body">
          <div className="card_header">
            <h5 className="card-title">{eventName}</h5>
            <h6 className="card-subtitle mb-2 ">{desc}</h6>
          </div>

          <div>
            <span>Date : {localDate}</span>
            <div>
              <span>
                From : {from.toLocaleTimeString("en-US", { timeZone }) + " "}
              </span>
              <span>To : {to.toLocaleTimeString("en-US", { timeZone })}</span>
            </div>
            <div>At : {location}</div>
            <div>Organizer : {name}</div>
            <div>Email : {email}</div>
            <div>Price : {price}</div>
            <div>Remaining : {remaining}</div>
            {loader ? (
              <ThreeDots
                height="80"
                width="40"
                radius="9"
                color="#2a265f"
                ariaLabel="three-dots-loading"
                wrapperStyle={{}}
                visible={true}
              />
            ) : (
              <button
                onClick={() => {
                  purchase(eventName, ipfsLink, eventID, price);
                }}
                className="btn btn-secondary homecard_btn"
              >
                Purchase
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
