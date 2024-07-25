// import Navabr from "../Navbar/Navbar";
import HomeCard from "./homeCard";
import "./home.css";
import { useContext, useEffect, useState } from "react";
import abi from "../../abi";
import axios from "axios";
import { useSDK } from "@metamask/sdk-react";
import { ethers } from "ethers";
import { PopContext } from "../context/popupcontext";
import { LineWave } from "react-loader-spinner";
import { Snackbar } from "@mui/material";

export default function Home() {
  const [cardArr, setCardArr] = useState([]);
  const [loader, setLoader] = useState(false);
  const [status, setStatus] = useState(false);

  const { provider, contractAddress, wallet, setPop } = useContext(PopContext);

  async function purchase(eventName, ipfsLink, eventID, price) {
    if (!wallet) {
      setPop(true);
      return;
    }

    setLoader(true);

    console.log("inside purchase");

    const uniqueNumber = ethers.randomBytes(4);
    const uniqueString = ethers.hexlify(uniqueNumber);
    const token_id = parseInt(uniqueString, 16);

    const jsonString = JSON.stringify({
      pinataContent: {
        id: eventID,
        event: eventName,
        token: token_id,
        url: ipfsLink,
      },
      pinataMetadata: {
        name: `${token_id}.json`,
      },
    });

    console.log(jsonString);

    const resFile = await axios.post(
      "https://api.pinata.cloud/pinning/pinJSONToIPFS",
      jsonString,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiI1YTNlYmI1NC02ZWY5LTQwMzQtYjIwNS02MjdhYTQ4ODU2MWUiLCJlbWFpbCI6ImhhcmFsZTE1MEBnbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwicGluX3BvbGljeSI6eyJyZWdpb25zIjpbeyJpZCI6IkZSQTEiLCJkZXNpcmVkUmVwbGljYXRpb25Db3VudCI6MX0seyJpZCI6Ik5ZQzEiLCJkZXNpcmVkUmVwbGljYXRpb25Db3VudCI6MX1dLCJ2ZXJzaW9uIjoxfSwibWZhX2VuYWJsZWQiOmZhbHNlLCJzdGF0dXMiOiJBQ1RJVkUifSwiYXV0aGVudGljYXRpb25UeXBlIjoic2NvcGVkS2V5Iiwic2NvcGVkS2V5S2V5IjoiMmZkMDA5YTZjYjA1ZDRlODgwNDIiLCJzY29wZWRLZXlTZWNyZXQiOiIwNjBmMTY0YWRlODZkMDEzOGY1ZDNlOWFiY2I5ZTE5N2ZlMzk5NGIxZmRjZmYyZjA3MzY5YjExNGZhN2EwYjRhIiwiaWF0IjoxNjk3NjY0OTU4fQ.WE7OCSjlmt11TzTgdXO68SMPP-r7gqsG-3DMiRJARLg`,
        },
      }
    );

    // console.log(resFile);
    const ImgHash = resFile.data;
    const ImageUrl = `https://gateway.pinata.cloud/ipfs/${ImgHash.IpfsHash}`;
    const contractAbi = abi;
    console.log(provider);
    const signer = await provider.getSigner();
    console.log(signer);
    const contract = new ethers.Contract(contractAddress, contractAbi, signer);
    var transaction;
    const amount = { value: ethers.parseEther(`${price}`) };
    try {
      transaction = await contract.purchase(
        eventID,
        ImageUrl,
        token_id,
        amount
      );
      // console.log(transaction);
      transaction.wait().then(async (res) => {
        const wallet_warning = document.getElementById("wallet_warning");
        if (res && res.status == 1) {
          console.log(res);
          setStatus(true);
          wallet_warning.classList.add("show_alert");

          const apiUrl =
            "http://localhost:5000/reduce_ticket_count";
          axios
            .put(apiUrl, { EventId: eventID })
            .then((res) => {
              console.log(res.data);
            })
            .catch((err) => {
              console.log(err);
            });

          await new Promise((resolve) =>
            setTimeout(() => {
              wallet_warning.classList.remove("show_alert");
              setLoader(false);
            }, 1800)
          );
        } else {
          wallet_warning.classList.add("show_alert");
          setStatus(false);

          await new Promise((resolve) =>
            setTimeout(() => {
              wallet_warning.classList.remove("show_alert");
              setLoader(false);
            }, 1800)
          );
        }
      });
    } catch (err) {
      setStatus(false);
      const wallet_warning = document.getElementById("wallet_warning");
      wallet_warning.classList.add("show_alert");
      await new Promise((resolve) =>
        setTimeout(() => {
          wallet_warning.classList.remove("show_alert");
          setLoader(false);
        }, 1800)
      );
      console.log(err);
    }
  }

  useEffect(() => {
    fetchData();
    const intervalId = setInterval(() => {
      fetchData();
    }, 1800);
    return () => clearInterval(intervalId);
  }, []);

  async function fetchData() {
    const apiUrl = "http://localhost:5000/Event";
    axios
      .get(apiUrl)
      .then((res) => {
        console.log(res.data);
        setCardArr(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <>
      <div className="home_body">
        {status ? (
          <div
            id="wallet_warning"
            className="alert alert-success wallet_alert"
            role="alert"
          >
            Transaction Successful
          </div>
        ) : (
          <div
            id="wallet_warning"
            className="alert alert-danger wallet_alert"
            role="alert"
          >
            Transaction Aborted
          </div>
        )}

        {cardArr.map((obj) => {
          return (
            <HomeCard
              eventName={obj.EventName}
              desc={obj.Description}
              date={obj.Date}
              from={obj.From}
              to={obj.To}
              location={obj.Location}
              name={obj.OrgnizerName}
              email={obj.Email}
              price={obj.Price}
              remaining={obj.Available}
              key={obj._id}
              id={obj._id}
              eventID={obj.EventId}
              purchase={purchase}
              ipfsLink={obj.IpfsLink}
              loader={loader}
            ></HomeCard>
          );
        })}
      </div>
    </>
  );
}
