import { useContext, useState } from "react";
import "./popup.css";
import { X } from "phosphor-react";
import { ethers } from "ethers";
import { PopContext } from "../context/popupcontext";
import OpenApp from "react-open-app";
import { MetaMaskProvider, useSDK } from "@metamask/sdk-react";

export default function PopUp() {
  const { pop, setPop, metaConnect, setMetaConnect } = useContext(PopContext);
  const { sdk } = useSDK();

  async function connect() {
    if (window.ethereum) {
      const temp = document.getElementById("main_body");
      temp.classList.remove("hide_body");
      console.log(temp);
      setPop(!pop);
      try {
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        console.log(accounts)
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
          <div className="card_close">
            <X onClick={shut} size={28} />
          </div>

          <p className="card-text">
            Some quick example text to build on the card title and make up the
            bulk of the card's content. Sunt labore reprehenderit ut dolor quis
            ea in excepteur id enim ullamco. Quis excepteur incididunt irure
            cupidatat commodo excepteur minim anim. Sint sit magna ut amet non
            deserunt cillum aliqua anim. Non esse ea exercitation magna labore
            excepteur anim nulla. Reprehenderit commodo in laborum consectetur
            amet velit exercitation ex pariatur. Do minim ex sint ipsum labore
            commodo aute sint enim reprehenderit aliqua excepteur cupidatat
            pariatur. Exercitation sint aliqua commodo et dolor irure in eiusmod
            consequat ut elit. Deserunt excepteur aliquip voluptate irure culpa
            veniam exercitation cillum eiusmod.Cupidatat irure ex qui
            adipisicing ullamco velit anim ipsum ullamco nisi sint. Voluptate
            duis eiusmod esse fugiat non nisi nostrud ipsum nulla Lorem occaecat
            dolor sit. Ullamco anim elit anim amet laborum aliqua sint
            incididunt adipisicing. Non minim velit in cupidatat. Mollit mollit
            tempor voluptate consequat voluptate veniam consectetur eiusmod
            laborum duis anim.
          </p>

          <div className="card_btns">
    

            <div>
              <button onClick={connect} className="btn btn-primary pop_btn">
                Connect
              </button>
            </div>

            <button className="btn btn-danger pop_btn" onClick={shut}>
              Decline
            </button>
          </div>
        </div>
      )}
    </>
  );
}
