import "./App.css";
import { useState } from "react";
import { ethers } from "ethers";
import axios from "axios";
import Login from "./components/login/login_page";
import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
import Home from "./components/home/home";
import Navbar from "./components/Navbar/Navbar";
import SignUp from "./components/sign_up/sign_up";
import PopUp from "./components/Navbar/popup";
import { PopContext } from "./components/context/popupcontext";
import Dash from "./components/DashBoard/Dash";
import Event from "./components/DashBoard/Event";
import Profile from "./components/DashBoard/Profile";

function App() {
  const [pop, setPop] = useState(false);
  const [metaConnect, setMetaConnect] = useState(false);
  const [isLogged, setIsLogged] = useState(false);

  const popCont = {
    pop,
    setPop,
    metaConnect,
    setMetaConnect,
    isLogged,
    setIsLogged,
  };

  return (
    <PopContext.Provider value={popCont}>
      <div className="app">
        <BrowserRouter>
          <Navbar></Navbar>
          <PopUp></PopUp>
          <Routes>
            <Route path="/login" element={<Login />}></Route>
            <Route path="/dash" element={<Dash />}>
              <Route path="profile" element={<Profile />}></Route>
              <Route path="event" element={<Event />}></Route>
            </Route>
            <Route path="/home" element={<Home />}></Route>
            <Route path="/signup" element={<SignUp />}></Route>
          </Routes>
        </BrowserRouter>
      </div>
    </PopContext.Provider>
  );
}

export default App;
