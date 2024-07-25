import "./App.css";
import { useState } from "react";
import Login from "./components/login/login_page";
import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
import Home from "./components/home/home";
import Navbar from "./components/Navbar/Navbar";
import SignUp from "./components/sign_up/sign_up";
import PopUp from "./components/Navbar/popup";
import { PopContext } from "./components/context/popupcontext";
import Dash from "./components/DashBoard/Dash";
import Validation from "./components/Navbar/Validation";
import Event from "./components/DashBoard/Event";
import Profile from "./components/DashBoard/Profile";
import QRPage from "./components/Navbar/QRPage";
import { qrContext } from "./components/context/qrContext";
import QrScan from "./components/DashBoard/qrscan";
import { qrScanContext } from "./components/context/qrScanContext";

function App() {
  const [pop, setPop] = useState(false);
  const [metaConnect, setMetaConnect] = useState(false);
  const [isLogged, setIsLogged] = useState(false);
  const [wallet, setWallet] = useState("");
  const [provider, setProvider] = useState(null);
  // const contractAddress = "0x208246393b9054819dD43dc29b8450e1AcdC6E18"; recent one
  // const contractAddress = "0xC3DFb73Dbbeb4E570c172680ac4739B823c1787F";
  const contractAddress = "0x535da67cEB7086352F42B6037cA94AC958E30dE8";
  const [eventId, setEventId] = useState();
  const [tokenId, setTokenId] = useState();

  const [scanEventId, setScan] = useState();

  const popCont = {
    pop,
    setPop,
    metaConnect,
    setMetaConnect,
    isLogged,
    setIsLogged,
    wallet,
    setWallet,
    provider,
    setProvider,
    contractAddress,
  };

  const qrCont = {
    eventId,
    tokenId,
    setEventId,
    setTokenId,
  };

  const qrScanCont = {
    scanEventId,
    setScan,
  };

  return (
    <PopContext.Provider value={popCont}>
      <qrContext.Provider value={qrCont}>
        <qrScanContext.Provider value={qrScanCont}>
          <div className="app">
            <BrowserRouter>
              <Navbar></Navbar>
              <PopUp></PopUp>
              <Routes>
                <Route path="/qr" element={<QRPage />}></Route>
                <Route path="/login" element={<Login />}></Route>

                <Route path="/validate" element={<Validation />}></Route>

                <Route path="/dash" element={<Dash />}>
                  <Route path="qrscan" element={<QrScan />}></Route>
                  <Route path="profile" element={<Profile />}></Route>
                  <Route path="event" element={<Event />}></Route>
                </Route>

                <Route path="/" element={<Home />}></Route>
                <Route path="/signup" element={<SignUp />}></Route>
              </Routes>
            </BrowserRouter>
          </div>
        </qrScanContext.Provider>
      </qrContext.Provider>
    </PopContext.Provider>
  );
}

export default App;
