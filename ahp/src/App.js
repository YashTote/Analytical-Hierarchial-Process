import React, {useState} from 'react';
import './App.css';
import Hamburger from './containers/top-tab';
import Homemain from './containers/homemain';
// import CriteriaModel from './containers/criteriamodal';

function App() {
  const[isOpen, setIsOpen] = useState(false);
  return (
    <div>
      <div><Hamburger/></div>
      <div class="button-container">
      <button onClick = {()=>{setIsOpen(true)}} class="crit-location">
        Open modal
       </button>
      </div>
      <Homemain open = {isOpen} onClose = {() =>{setIsOpen(false);}}>
        This is the button
      </Homemain>
    </div>
  );
}

export default App;
