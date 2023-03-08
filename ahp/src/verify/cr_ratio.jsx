import React, {useState} from "react";
import { useSelector } from "react-redux";
// import './cr_ratio.css'
export default function Cr_Ratio(){
   
  const CR = useSelector(state => state.Cr_Ratio   );
  // console.log(CR);
  console.log("BUSTED")

  // The greate C.R ratio logic;
  
  return(
        <div class="card card-1">
         <p class="heading"><h1 class="heading">Consistency Ratio</h1></p> 
           <div class="info">
            <i class="italics">Consistency Ratio ensures that the 
              scores assigned in a pairwise comparison matrix
               are consistent and do not violate the transitivity principle. </i>
           </div>  
             <hr/> 
         <h3 class="CR-head">CR:</h3>
         <p>This is where the current consistency ration will be displayed:</p>
         <h3>C.R = C.I/RI</h3>
         <div class="info">
            <i class="italics">Your C.R is <b>higher</b>/ C.R is lower </i>
           </div>  
        </div>);
}