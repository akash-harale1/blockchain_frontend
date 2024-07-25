import { useContext, useState } from "react";
import "./popup.css";
import { Files, X } from "phosphor-react";
import { ethers } from "ethers";
import { PopContext } from "../context/popupcontext";
import OpenApp from "react-open-app";
// import { Web3Provider } from ethers;

export default function PopUp() {
  const {
    pop,
    setPop,
    metaConnect,
    setMetaConnect,
    wallet,
    setWallet,
    setProvider,
    provider,
  } = useContext(PopContext);
  // const { sdk } = useSDK();

  async function connect() {
    if (window.ethereum) {
      const curr_provider = new ethers.BrowserProvider(window.ethereum);
      setProvider(curr_provider);
      const temp = document.getElementById("main_body");
      temp.classList.remove("hide_body");
      console.log(temp);
      setPop(!pop);
      try {
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        console.log(accounts);

        // console.log(signer);
        console.log(accounts[0]);
        setWallet(accounts[0]);
        setMetaConnect(true);
      } catch (error) {
        console.log(error);
        setMetaConnect(false);
      }
    } else {
    }
  }

  function shut() {
    const temp = document.getElementById("main_body");
    temp.classList.remove("hide_body");
    console.log(temp);
    setPop(!pop);
  }

  return (
    <>
      {pop && (
        <div className="card_body">
          <div className="pop_card_header">
            <div>
              <Files size={24} />
              <span>Terms and Services</span>
            </div>
            <X className="shut_btn" onClick={shut} size={18} />
          </div>



          <p className="card-text">
            Before you proceed with creating events on our platform, we want to
            inform you about an important aspect of our service. Please be aware
            that there are platform fees associated with event creation
          </p>

          <div className="card_btns">
            <button onClick={connect} className="btn btn-primary pop_btn">
              Connect Wallet
            </button>

            <button className="btn btn-danger pop_btn warn_btn" onClick={shut}>
              Decline
            </button>
          </div>
        </div>
      )}
    </>
  );
}
