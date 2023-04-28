import React from "react";
import { useSelector } from "react-redux";
import './cr_ratio.css'
// This reders the Consistency ratio box that is at the right side 
// of the input criteria matrix.


export default function Cr_box({tableNumber}){
    const display_filled = "This is the current Consistency Ratio:"
    const display_notfilled = "Please complete the choice matrix to see for the consistency ratio."
    const CR_data = useSelector((state) => state.CR_Ratio);
    
    const status = (CR_data[tableNumber] === undefined) ? false : CR_data[tableNumber]["current_status"];
    const C_R = (CR_data[tableNumber] === undefined)? NaN : CR_data[tableNumber]["C_R"];
    const content = (status) ? display_filled : display_notfilled;
    // console.log(status);
    return(
       <div class="card card-1">
       <p class="heading"><h1 class="heading">Consistency Ratio</h1></p> 
         <div class="info">
          <i class="italics">Consistency Ratio ensures that the 
            scores assigned in a pairwise comparison matrix
             are consistent and do not violate the transitivity principle. </i>
         </div>  
           <hr/> 
       
       <p className="dynamic-text">{content}</p>
       
       
       { (status) ? ((C_R < 0.1) ? (
         <div>
        <h3 class = "green-text">{C_R}</h3>
        <h3>C.R = C.I/RI</h3>
        <i class = "info">The consistency ratio is acceptable. You can proceed further.</i>
        </div>
       ) : (
         <div>
        <h3 class = "red-text">{C_R}</h3> 
        <h3>C.R = C.I/RI</h3>
        <i class = "info">This consistency ratio is <b>NOT</b> acceptable as it is more than 0.1.
         Please check the inconsistencies in the matrix.</i>
        </div>
       )) :(null)
       } 
       <a className="link" target="_blank" href="https://www.spicelogic.com/docs/ahpsoftware/intro/ahp-calculation-methods-396">
         Know more about consistency ratio.
       </a>
      </div>
     )
 }