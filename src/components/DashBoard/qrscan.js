import { useContext, useEffect, useState } from "react";
import { qrScanContext } from "../context/qrScanContext";
import { Html5QrcodeScanner } from "html5-qrcode";
import ScanResult from "./scanresult";
import "./qrverification.css";

export default function QrScan() {
  const { scanEventId } = useContext(qrScanContext);
  const [flag, setFlag] = useState(true);
  const [setScan, setScanResult] = useState(null);

  function loadQR() {
    setFlag(!flag);
    const scanner = new Html5QrcodeScanner("reader", {
      qrbox: {
        width: 250,
        height: 250,
      },
      fps: 5,
    });

    scanner.render(success, error);

    function success(rslt) {
      // scanner.clear();
      setScanResult(rslt);
    }

    function error() {
      // scanner.clear();
      console.warn(error);
    }
  }

  // useEffect(() => {}, []);

  return (
    <>
      <div className="verification_page">
        <h1>Verify Ticket</h1>
        {flag ? (
          <div className="scan_btn">
            <button onClick={loadQR} className="btn btn-secondary">
              start scan
            </button>
          </div>
        ) : (
          <span></span>
        )}

        {/* <div id="reader"></div> */}

        {setScan ? (
          <ScanResult status={setScan}></ScanResult>
        ) : (
          <div id="reader"></div>
        )}
      </div>
    </>
  );
}
