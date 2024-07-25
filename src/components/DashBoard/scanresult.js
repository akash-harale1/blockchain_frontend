import { useContext, useEffect, useState } from "react";
import CryptoJS from "crypto-js";
import { qrScanContext } from "../context/qrScanContext";
import axios from "axios";
import { PopContext } from "../context/popupcontext";
import abi from "../../abi";
import { ethers } from "ethers";
import { Network, Alchemy } from "alchemy-sdk";

export default function ScanResult({ status, scanner }) {
  const [result, setResult] = useState(null);
  const [flag, setFlag] = useState();

  const { scanEventId } = useContext(qrScanContext);
  const { provider, contractAddress, wallet, setPop } = useContext(PopContext);

  useEffect(() => {
    console.log("inside useEffect");
    console.log(scanner + "this is scanner");
    const match = status.match(/(www\.harale\.com\|)/);
    if (match) {
      const updatedString = status.replace(/(www\.harale\.com\|)/, "");
      // console.log(updatedString);

      const decrypt = CryptoJS.AES.decrypt(
        updatedString,
        "akashharaleisinpictakashharaleisinpictakashharaleisinpictakashharaleisinpictakashharaleisinpictakashharaleisinpictakashharaleisinpictakashharaleisinpictakashharaleisinpictakashharaleisinpict"
      );
      const ogText = decrypt.toString(CryptoJS.enc.Utf8);
      const jsonText = JSON.parse(ogText);
      // console.log(jsonText.token_id);
      if (jsonText.event_id === scanEventId) {
        console.log("test passed");
        checkowner(contractAddress, jsonText.token_id, jsonText);
      } else {
        console.log("failed");
        setResult("Wrong Event ❌");
      }
    } else {
      setResult("Invalid  ❌");
    }
  }, []);

  const checkowner = async (contract, token, jsonText) => {
    if (!wallet) {
      setPop(true);
      return;
    }

    console.log("inside check");

    const signer = await provider.getSigner();
    const contractAbi = abi;
    const curr_contract = new ethers.Contract(contract, contractAbi, signer);

    var transaction;

    const settings = {
      apiKey: "TY_MMVMlTD2UytOW900Dm7Q-OsU8ftRF",
      network: Network.ETH_SEPOLIA,
    };

    const alchemy = new Alchemy(settings);
    alchemy.nft.getOwnersForNft(contract, token).then((res) => {
      console.log(res.owners);
      console.log(jsonText.address);
      if (res.owners == jsonText.address) {
        // setResult("Accepted ✅");
        burn(jsonText, curr_contract, transaction);
      } else {
        setResult("Verification failed ❌");
      }
    });
  };

  async function burn(text, curr_contract, transaction) {
    console.log("inside burn function");
    try {
      transaction = await curr_contract.burnNFT(text.token_id, text.event_id);
      transaction.wait().then(async (res) => {
        console.log(res);
        setResult("Accepted ✅");
      });
    } catch (error) {
      setResult("User Already Accepted ❌");
      console.log(error);
    }
  }

  return (
    <>
      <h4>{result}</h4>
    </>
  );
}
