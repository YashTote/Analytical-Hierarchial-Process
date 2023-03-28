import React, {useEffect} from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateEigen } from "../../slices/eigenSlice";
import { updateCR_Ratio } from "../../slices/CR_RatioSlice";
import './normal_matrix.css'


class TableSingleRow {

  constructor(width, criteriaName, tableData, tableTitle){
    this.width = width;
    this.criteriaName = criteriaName;
    this.tableData = tableData;
    this.tableTitle = tableTitle;
  }
  //If the criteriaName comes as an Array, we can easily map over each element and create an variable that holds the thead structure.

   TableStruct(){
    const titleRow = this.criteriaName.map(e =>(<th className="border border-slate-600 bg-slate-300">{e}</th>));
    const valueRow = this.tableData.map(e => (<td className="border border-slate-700 bg-slate-50 ">{e}</td>))
    const tableStruct = (
      <div className="TableSingleRow font-serif">
        <div className="text-2xl font-semibold">{this.tableTitle}</div>
    <table className="tableStruct w-2/3 text-lg border-collapse border border-slate-500 bg-slate-300">
         <thead>
           <tr>
             <th className="border w-1/5 border-slate-600 bg-slate-300 ">Criteria Name</th>
              {titleRow}
           </tr>
         </thead>
         <tbody>
          <tr>
            <td className="border font-semibold border-slate-600 bg-slate-300">Values</td>
              {valueRow}
          </tr>
         </tbody>
    </table></div>) 
    
    return tableStruct;
  }
}

class TableMultipleRow{
  constructor(width, criteriaName, tableData, tableTitle){
    this.width = width;
    this.criteriaName = criteriaName;
    this.tableData = tableData;
    this.tableTitle = tableTitle;
  }
  
  MultiTableStruct(){
    const titleRow = this.criteriaName.map(e =>(<th className="border border-slate-600 bg-slate-300">{e}</th>));
    const valueRow = [];
    console.log(this.tableData);
    for (let i = 0; i < this.width; i++) {
      valueRow[i] = [];
      const valueRowTR = [];
      valueRowTR.push(<td className="border font-semibold border-slate-600 bg-slate-300">{this.criteriaName[i]}</td>);
      const tableDataElement = [];
       
      for (let j = 1; j <= this.width; j++) {
        tableDataElement.push(<td className="border border-slate-700 bg-slate-50 ">{this.tableData[i][j]}</td>);
      }
      valueRowTR.push(tableDataElement); 
      valueRow[i].push(<tr>{valueRowTR}</tr>);     
    }
  
    const multitableStruct = (
      <div className="TableMultipleRow font-serif">
        <div className="text-2xl font-semibold">{this.tableTitle}</div>
    <table className="tableStruct w-2/3 text-lg border-collapse border border-slate-500 bg-slate-300">
         <thead>
           <tr>
             <th className="border w-1/5 border-slate-600 bg-slate-300 ">Criteria Name</th>
              {titleRow}
           </tr>
         </thead>
         <tbody>
          
              {valueRow}
          
         </tbody>
    </table></div>) 
    return multitableStruct;
  }

}

export default function Normal_matrix({ value }) {
  const cr_obj = useSelector((state) => state.crit);
  const dispatch = useDispatch();
  let PW_matrix = [];

  for (let i = 0; i <= value; i++) {
    PW_matrix[i] = [];
    for (let j = 0; j <= value; j++) {
      PW_matrix[i][j] = 0;
      if (i == j) PW_matrix[i][j] = 1;
    }
  }
  let filled=0; // keeps track of the total criteria choice selected by the user.
  for (let i = 1; i <= value - 1; i++) {
    for (let j = i + 1; j <= value; j++) {
      if (i === j) {
        PW_matrix[i][j] = 1;
        filled+=1;
      }
      const crit = cr_obj[`${i}-${j}`];
      const crit_name = crit["crit_name_slice"];
      const crit_choice = crit["crit_choice_slice"]; 
        
      
      if (crit_name && crit_choice) {
        filled+=1;
  
        if (crit_name[4] === "1") {
          let number = crit_choice[4];

          if (crit_choice.length === 6) { 
  // This hadles the case where user selects 1-2-10 or 3-4-11 
  // i.e. double digit criteria options (these are 8 and 9 as value for radio box.)
            number += crit_choice[5];
            
          }
          let temp =  Number(number) - 2;
          temp = temp.toFixed(3);
          PW_matrix[i][j] = Number(temp);
          temp = 1 / (Number(number) - 2);
          temp = temp.toFixed(3);
          PW_matrix[j][i] = Number(temp);
        } else {
          let number = crit_choice[4];
          if (crit_choice.length === 6) {
            number += crit_choice[5];
          }
          let temp = Number(number) - 2;
          temp = temp.toFixed(3);
          PW_matrix[j][i] = Number(temp);
          temp = 1 / (Number(number) - 2);
          temp = temp.toFixed(3);
          PW_matrix[i][j] = Number(temp);
        }
      }
    }
  }
  const total_filled =  (value * (value - 1)) / 2;
  console.log(filled);
  console.log(total_filled);
  
  const PW_sum = new Array();

  for (let i = 1; i <= value; i++) {
    let num = 0;
    for (let j = 1; j <= value; j++) {
      num += PW_matrix[j][i];
    }
    PW_sum[i] = num;
   
  }

  // Normalised or synthesised matrix calculation
  const N_matrix = new Array();
  for (let i = 1; i <= value; i++) {
    N_matrix[i] = [];
    for (let j = 1; j <= value; j++) {
      let num = PW_matrix[i][j] / PW_sum[j];
      num = num.toFixed(3);
      // console.log(num);
      N_matrix[i][j] = Number(num);
      // console.log(N_matrix[i][j]);
    }
  }



  // Eigen vector matrix
  const eigen_vector = new Array();
  for (let i = 1; i <= value; i++) {
    let num = 0;
    for (let j = 1; j <= value; j++) {
      num += N_matrix[i][j];
    }
    let temp = num / Number(value);
    temp = temp.toFixed(3);
    eigen_vector[i] = Number(temp);
  }

  // dispatch(updateEigen(eigen_vector))
  // calculation weighted sum matrix and Weighted sum
  const W_matrix = JSON.parse(JSON.stringify(N_matrix));
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


 // Calculation of Derived priority
  const derived_priority = new Array();
  let total_derived_priority = 0;
  for (let i = 1; i<= value; i++) {
     derived_priority[i] = W_sum[i]/eigen_vector[i];
     let num = derived_priority[i].toFixed(3);
     derived_priority[i] = Number(num);
     total_derived_priority+=derived_priority[i]; 
  }



 //calculation  of λ max
  const lambda_max = total_derived_priority/Number(value);
 
 //calculation of C.I ratio
 const C_I = (lambda_max - Number(value)) / (Number(value)-1);

 const random_index =[0,0.00, 0.00, 0.58, 0.90, 1.12, 1.24, 1.32, 1.41, 1.45, 1.49];

 // Calculation of C.R ratio;
 let C_R = C_I/random_index[(Number(value))];
//  dispatch(updateCR_Ratio({C_R}));
  C_R = C_R.toFixed(3);
  C_R = Number(C_R);


const display_filled = "This is the current Consistency Ratio:"
const display_notfilled = "Please complete the choice matrix to see for the consistency ratio."
let toShowStatus = (total_filled === filled) ;
useEffect(() => {dispatch(updateCR_Ratio({toShowStatus, C_R}))});
const eigenNames = [];

// width,criteriaName,tableData,tableTitle
for (let i = 0; i < value; i++) {
  eigenNames.push(`Crit ${i+1}`);
}  


const slicedEigen = eigen_vector.slice(1);
const EigenTable = new TableSingleRow(value, eigenNames, slicedEigen, "Priority Vector");

const PWTable = new TableMultipleRow(value,eigenNames, PW_matrix.slice(1), "Pair Wise comparison table.");

// console.log(N_matrix.slice(2));
const N_matrixTable = new TableMultipleRow(value,eigenNames, N_matrix.slice(1) , "Normalised Matrix");

// console.log((PWTable_component));
return (
  <>
   {EigenTable.TableStruct()}
   {PWTable.MultiTableStruct()}
   {N_matrixTable.MultiTableStruct()}
  </>
); 
}
