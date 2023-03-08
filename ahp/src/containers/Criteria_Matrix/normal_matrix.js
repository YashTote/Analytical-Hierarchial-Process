// import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateCR_Ratio } from "../../slices/CR_RatioSlice";
import './cr_ratio.css'

function Cr_box({content, filled, C_R}){
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
      
      {/* <h3>{C_R}</h3> */}
      { (filled) ? ((C_R < 0.1) ? (
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

export default function Normal_matrix({ value }) {
  const cr_obj = useSelector((state) => state.crit);
 
  let PW_matrix = [];

  for (let i = 0; i <= value; i++) {
    PW_matrix[i] = [];
    for (let j = 0; j <= value; j++) {
      PW_matrix[i][j] = 0;
      if (i == j) PW_matrix[i][j] = 1;
    }
  }
  let filled=0;
  for (let i = 1; i <= value - 1; i++) {
    for (let j = i + 1; j <= value; j++) {
      if (i === j) {
        PW_matrix[i][j] = 1;
        filled+=1;
      }
      const crit = cr_obj[`${i}-${j}`];
      const crit_name = crit["crit_name_slice"];
      const crit_choice = crit["crit_choice_slice"]; 
        
        // console.log("^^^^^^")
        // console.log(crit_name);
      if (crit_name && crit_choice) {
        filled+=1;
  
        if (crit_name[4] === "1") {
          let number = crit_choice[4];
          if (crit_choice.length === 6) {
            number += crit_choice[5];
          }
          PW_matrix[i][j] = Number(number) - 2;
          PW_matrix[j][i] = 1 / (Number(number) - 2);
        } else {
          let number = crit_choice[4];
          if (crit_choice.length === 6) {
            number += crit_choice[5];
          }
          PW_matrix[j][i] = Number(number) - 2;
          PW_matrix[i][j] = 1 / (Number(number) - 2);
        }
      }
    }
  }
  const total_filled =  (value * (value - 1)) / 2;
  // console.log(total_filled, filled, value);
  
  const PW_sum = new Array();

  for (let i = 1; i <= value; i++) {
    let num = 0;
    for (let j = 1; j <= value; j++) {
      num += PW_matrix[j][i];
    }
    PW_sum[i] = num;
    // console.log(PW_sum[i]);
  }
//  console.log(PW_matrix);

  // Normalised or synthesised matrix calculation
  const N_matrix = new Array(value);
  for (let i = 1; i <= value; i++) {
    N_matrix[i] = [];
    for (let j = 1; j <= value; j++) {
      let num = PW_matrix[i][j] / PW_sum[j];
      num = num.toFixed(3);
      N_matrix[i][j] = Number(num);
    }
  }
//  console.log(N_matrix);
  // Eigen vector matrix
  const eigen_vector = new Array();
  for (let i = 1; i <= value; i++) {
    let num = 0;
    for (let j = 1; j <= value; j++) {
      num += N_matrix[i][j];
    }
    eigen_vector[i] = num / Number(value);
  }
  //  console.log(eigen_vector);

  // calculation weighted sum matrix and Weighted sum
  const W_matrix = N_matrix;
  const W_sum = new Array(); 


  for (let i = 1; i <= value; i++) {
    W_sum[i] = 0;
    for (let j = 1; j <= value; j++) {
       W_matrix[i][j] = PW_matrix[i][j] * eigen_vector[j];
       W_sum[i]+= W_matrix[i][j];
    }
    let num = W_sum[i].toFixed(3);
    W_sum[i] = Number(num);
  }
  console.log(W_sum);

 // Calculation of Derived priority
  const derived_priority = new Array();
  let total_derived_priority = 0;
  for (let i = 1; i<= value; i++) {
     derived_priority[i] = W_sum[i]/eigen_vector[i];
     let num = derived_priority[i].toFixed(3);
     derived_priority[i] = Number(num);
     total_derived_priority+=derived_priority[i]; 
  }
  // console.log(total_derived_priority);


 //calculation  of λ max
  const lambda_max = total_derived_priority/Number(value);
 
 //calculation of C.I ratio
 const C_I = (lambda_max - Number(value)) / (Number(value)-1);
  console.log(C_I); 
 const random_index =[0,0.00, 0.00, 0.58, 0.90, 1.12, 1.24, 1.32, 1.41, 1.45, 1.49];

 // Calculation of C.R ratio;
 let C_R = C_I/random_index[(Number(value))];
//  dispatch(updateCR_Ratio({C_R}));
  C_R = C_R.toFixed(3);
  C_R = Number(C_R);
 console.log(C_R);

const display_filled = "This is the current Consistency Ratio:"
const display_notfilled = "Please complete the choice matrix to see for the consistency ratio."
if(total_filled === filled){
  return(<Cr_box content={display_filled} filled={true} C_R = {C_R} />)
}
else{
  return(<Cr_box content={display_notfilled} filled={false} C_R = {C_R} />)
}
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
   <h3>{C_R}</h3>
   <div class="info">
      <i class="italics">Your C.R is <b>higher</b>/ C.R is lower </i>
     </div>  
  </div>
}
