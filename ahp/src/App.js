import React, {useState} from 'react';
import './App.css';
import Hamburger from './containers/top-tab';
import Homemain from './containers/homemain';
import CriteriaModel from './containers/criteriamodal';

function App() {
  const[isOpen, setIsOpen] = useState(false);
  return (
    <div>
      <Hamburger/>
      {/* <CriteriaModel open = {isOpen}/> */}
    </div>
  );
}

export default App;
