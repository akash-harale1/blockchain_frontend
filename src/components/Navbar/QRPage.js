import { useContext, useEffect, useState } from "react";
import "./qr.css";
import { qrContext } from "../context/qrContext";
import { PopContext } from "../context/popupcontext";
import { QRCode } from "react-qr-code";
import CryptoJS from "crypto-js";
// import { QRCode } from "phosphor-react";

export default function QRPage() {
  const { eventId, tokenId } = useContext(qrContext);
  const { wallet } = useContext(PopContext);

  const [encryptedData, setEncrypt] = useState();

  const jsonData = JSON.stringify({
    event_id: eventId,
    token_id: tokenId,
    address: wallet,
  });

  useEffect(() => {
    const secretKey =
      "akashharaleisinpictakashharaleisinpictakashharaleisinpictakashharaleisinpictakashharaleisinpictakashharaleisinpictakashharaleisinpictakashharaleisinpictakashharaleisinpictakashharaleisinpict";
    const encrypt = CryptoJS.AES.encrypt(jsonData, secretKey).toString();
    setEncrypt(encrypt);
  }, []);

  return (
    <>
      <div className="qr_page">
        <h1>QR Code</h1>
        <div>
          <QRCode value={`www.harale.com|${encryptedData}`} />
        </div>
      </div>
    </>
  );
}
