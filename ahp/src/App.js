import React, { useEffect, useState } from "react";
import "./App.css";
// import Hamburger from "./containers/top-tab";
import Intro from "./containers/intro";
import Crit_Table from "./containers/Criteria_Matrix/crit_table";
import EigenTable from "./containers/eigentable";
import { useDispatch } from "react-redux";
import { getCrAndAltValue } from "./slices/CrAndAltValueSlice"; 
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
  const var1 =data.crit, var2 = data.alt;
  const dispatch = useDispatch();
  useEffect(() => {dispatch(getCrAndAltValue({var1,var2}));});  

  function closeIntro(newState) {
    setIsOpen(newState);
  }
  if (isOpen) {
    return (
      <div className="App">
        <Intro closeIntro={closeIntro} obtainData={obtainData} />
        <div class="button-container">
        </div>
      </div>
    );
  } 
  else {
    // console.log(data.crit, data.alt);
    return (
      <div className="App">
        <div>
          <Crit_Table value={data.crit} tableNumber={0}/>
          {/* <EigenTable/> */}
        </div>
      </div>
    );
  }
}

export default App;
