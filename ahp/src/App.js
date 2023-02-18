import React, { useState } from "react";
import "./App.css";
import Hamburger from "./containers/top-tab";
import Homemain from "./containers/homemain";
import Intro from "./containers/intro";

function App() {
  const [isOpen, setIsOpen] = useState(true);
  const [data, setData] = useState({crit:0, alt:0});
  function obtainData(x, y) {
    setData({
      ...data,
      crit: x,
      alt: y
    });
  }

  function closeIntro(newState) {
    setIsOpen(newState);
  }
  if (isOpen) {
    return (
      <div>
        <div>
          <Hamburger />
        </div>
        <Intro closeIntro={closeIntro} obtainData={obtainData} />
        <div class="button-container">
        </div>
      </div>
    );
  } 
  else {
    console.log(data.crit, data.alt);
    return (
      <div>
        <div>
          <Hamburger />
        </div>
        <div class="button-container">
        </div>
      </div>
    );
  }
}

export default App;
