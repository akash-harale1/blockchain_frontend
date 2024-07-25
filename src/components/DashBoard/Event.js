import { useContext, useRef, useState } from "react";
import axios from "axios";
import { v1 as uuidv1 } from "uuid";
import { PopContext } from "../context/popupcontext";
import { ThreeDots } from "react-loader-spinner";
import { ethers } from "ethers";
// import { Web3Provider } from ethers;
import abi from "../../abi";
import "./Event.css";

export default function Event() {
  const { wallet, setWallet, provider, contractAddress, setPop } =
    useContext(PopContext);

  const [showCreate, setShowCreate] = useState(false);
  const [status, setStatus] = useState();

  const eventref = useRef(null);
  const dateref = useRef(null);
  const startref = useRef(null);
  const endref = useRef(null);
  const locref = useRef(null);
  const descref = useRef(null);
  const priceref = useRef(null);
  const totalref = useRef(null);
  const imageref = useRef(null);

  const sendFileToIPFS = async (e) => {
    e.preventDefault();

    if (!wallet) {
      setPop(true);
      return;
    }

    setShowCreate(true);
    console.log(wallet);

    const apiUrl = "http://localhost:5000/Event";

    try {
      const fileImg = imageref.current.files[0];
      const formData = new FormData();

      formData.append("file", fileImg);
      formData.append("pinataOptions", '{"cidVersion": 0}');
      formData.append("pinataMetadata", '{"name": "pinnie"}');

      const resFile = await axios.post(
        "https://api.pinata.cloud/pinning/pinFileToIPFS",
        formData,
        {
          headers: {
            Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiI1YTNlYmI1NC02ZWY5LTQwMzQtYjIwNS02MjdhYTQ4ODU2MWUiLCJlbWFpbCI6ImhhcmFsZTE1MEBnbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwicGluX3BvbGljeSI6eyJyZWdpb25zIjpbeyJpZCI6IkZSQTEiLCJkZXNpcmVkUmVwbGljYXRpb25Db3VudCI6MX0seyJpZCI6Ik5ZQzEiLCJkZXNpcmVkUmVwbGljYXRpb25Db3VudCI6MX1dLCJ2ZXJzaW9uIjoxfSwibWZhX2VuYWJsZWQiOmZhbHNlLCJzdGF0dXMiOiJBQ1RJVkUifSwiYXV0aGVudGljYXRpb25UeXBlIjoic2NvcGVkS2V5Iiwic2NvcGVkS2V5S2V5IjoiMmZkMDA5YTZjYjA1ZDRlODgwNDIiLCJzY29wZWRLZXlTZWNyZXQiOiIwNjBmMTY0YWRlODZkMDEzOGY1ZDNlOWFiY2I5ZTE5N2ZlMzk5NGIxZmRjZmYyZjA3MzY5YjExNGZhN2EwYjRhIiwiaWF0IjoxNjk3NjY0OTU4fQ.WE7OCSjlmt11TzTgdXO68SMPP-r7gqsG-3DMiRJARLg`,
          },
        }
      );
      const ImgHash = resFile.data;
      const ImageUrl = `https://gateway.pinata.cloud/ipfs/${ImgHash.IpfsHash}`;
      console.log(ImageUrl);

      sendData(apiUrl, ImageUrl);

      //Take a look at your Pinata Pinned section, you will see a new file added to you list.
    } catch (error) {
      console.log("Error sending File to IPFS: ");
      console.log(error);
      // alert("Error sending file");
      setShowCreate(false);
    }
  };

  const sendData = async (apiUrl, ImageUrl) => {
    const contractAbi = abi;

    const signer = await provider.getSigner();
    // console.log(signer);
    const contract = new ethers.Contract(contractAddress, contractAbi, signer);
    // console.log(contract);

    const obj = {};
    obj.EventId = uuidv1();
    obj.EventName = eventref.current.value.trim();
    obj.Date = dateref.current.value;
    obj.From = `${startref.current.value}:00`;
    obj.To = `${endref.current.value}:00`;
    obj.Location = locref.current.value.trim();
    obj.Description = descref.current.value.trim();
    obj.Price = priceref.current.value;
    obj.Ticket = totalref.current.value;
    obj.IpfsLink = ImageUrl;

    const price = ethers.parseEther(obj.Price.toString());
    var transaction;
    try {
      transaction = await contract.setEvent(price, obj.Ticket, obj.EventId);
      transaction.wait().then(async (res) => {
        const event_warning = document.getElementById("event_warning");
        if (res && res.status == 1) {
          console.log(res);

          event_warning.classList.add("show_event_alert");
          setStatus(true);
          await new Promise((res) => {
            setTimeout(() => {
              event_warning.classList.remove("show_event_alert");
              setShowCreate(false);
            }, 1800);
          });
        } else {
          event_warning.classList.add("show_event_alert");
          setStatus(false);
          await new Promise((res) => {
            setTimeout(() => {
              event_warning.classList.remove("show_event_alert");
              setShowCreate(false);
            }, 1800);
          });

          return;
        }
      });
      console.log(transaction);
    } catch (err) {
      setStatus(false);
      const event_warning = document.getElementById("event_warning");
      event_warning.classList.add("show_event_alert");
      await new Promise((res) => {
        setTimeout(() => {
          event_warning.classList.remove("show_event_alert");
          setShowCreate(false);
        }, 1800);
      });
      console.log(err);

      return;
    }

    // console.log(transaction);

    // console.log(obj.EventId);
    axios
      .post(apiUrl, obj, {
        headers: {
          Authorization: sessionStorage.getItem("Token"),
        },
      })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });

    try {
    } catch (err) {
      console.log(err);
    }
  };

  const [inputTypeDate, setInputType] = useState("text");
  const [inputFrom, setInputFrom] = useState("text");
  const [inputTo, setInputTo] = useState("text");

  //for date

  function setDate() {
    setInputType("date");
  }
  function changeDate() {
    setInputType("text");
  }

  //for from time
  function setFrom() {
    setInputFrom("time");
  }

  function changeFrom() {
    setInputFrom("text");
  }

  //for to time

  function setTo() {
    setInputTo("time");
  }

  function changeTo() {
    setInputTo("text");
  }

  return (
    <>
      {/* <h4 style={{textAlign:"center"}}>Create Event</h4> */}
      <div className="event_form_body">
        {status ? (
          <div
            id="event_warning"
            className="alert alert-success event_alert"
            role="alert"
          >
            Transaction Successful
          </div>
        ) : (
          <div
            id="event_warning"
            className="alert alert-danger event_alert"
            role="alert"
          >
            Transaction Aborted
          </div>
        )}

        <form onSubmit={sendFileToIPFS} className="event_form">
          <input
            type="text"
            className="form-control"
            ref={eventref}
            placeholder="Event Name"
            aria-label="Username"
            aria-describedby="basic-addon1"
            // required
          />

          <label>date</label>
          <input
            // type={inputTypeDate}
            type="date"
            className="form-control"
            placeholder="Enter date for your event"
            id="date"
            // onFocus={setDate}
            // onBlur={changeDate}
            aria-label="Username"
            ref={dateref}
            aria-describedby="basic-addon1"
            // required
          />
          <label>starting time</label>
          <input
            // type={inputFrom}
            type="time"
            className="form-control"
            placeholder="Starting time"
            // onFocus={setFrom}
            // onBlur={changeFrom}
            aria-label="time"
            ref={startref}
            aria-describedby="basic-addon1"
            // required
          />
          <label>ending time</label>
          <input
            // type={inputTo}
            type="time"
            className="form-control"
            placeholder="Ending time"
            aria-label="time"
            // onFocus={setTo}
            // onBlur={changeTo}
            ref={endref}
            aria-describedby="basic-addon1"
            // required
          />

          <input
            type="text"
            className="form-control"
            placeholder="Location"
            aria-label="time"
            ref={locref}
            aria-describedby="basic-addon1"
            // required
          />

          <input
            type="text"
            className="form-control"
            placeholder="Description"
            aria-label="time"
            ref={descref}
            aria-describedby="basic-addon1"
            // required
          />

          <input
            type="text"
            className="form-control"
            placeholder="Price of ticket (in ETH)"
            aria-label="time"
            ref={priceref}
            aria-describedby="basic-addon1"
            // required
          />

          <input
            type="number"
            className="form-control"
            placeholder="Total tickets"
            aria-label="time"
            ref={totalref}
            aria-describedby="basic-addon1"
            // required
          />

          <input
            type="file"
            ref={imageref}
            accept="image/*"
            className="form-control"
            aria-label="time"
            aria-describedby="basic-addon1"
            // required
          />

          {showCreate ? (
            <div className="create_event_loader">
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
            <input
              type="submit"
              className="form-control btn btn-secondary submit_btn"
              placeholder="Event Name"
              aria-label="Username"
              aria-describedby="basic-addon1"
              value="create event"
              // required
            />
          )}
        </form>
      </div>
    </>
  );
}
