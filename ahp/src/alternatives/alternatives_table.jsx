import React , {useEffect}  from "react";
import { useDispatch } from "react-redux";
import "./alternative_table.css";
import { useState } from "react";
import './alt_box.css'
import { updateAltName } from "../slices/altTableSlice";
// import Normal_matrix from "./Alt_normal_matrix";
// import Alt_box from "./Alt_Box";
import './normal_matrix.css'


function Alt_box({tableNumber, toShowStatus, C_R}){
  const display_filled = "This is the current Consistency Ratio:"
  const display_notfilled = "Please complete the choice matrix to see for the consistency ratio."
  // const CR_data = useSelector((state) => state.CR_Ratio);
  const status = toShowStatus;
  const content =(status) ? display_filled : display_notfilled;
  // const status = (CR_data[tableNumber] === undefined) ? false : CR_data[tableNumber]["current_status"];
  // const C_R = (CR_data[tableNumber] === undefined)? NaN : CR_data[tableNumber]["C_R"];
  // const content = (status) ? display_filled : display_notfilled;
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
    // console.log(this.tableData);
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


function Normal_matrix({ value, tableNumber, cr_obj }) {
  // const cr_obj = useSelector((state) => state.AltCrit);
  // const cr_obj1 = useSelector((state) => state.CrAndAltValue);
  // console.log(cr_obj);

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
      // const crit = cr_obj[`${tableNumber}-${i}-${j}`];
      // console.log(`${tableNumber}-${i}-${j}`);
      // console.log(crit);
      const crit_name = cr_obj.map( e => {
        if(e=== undefined){}
        else if(e.id == `${tableNumber}-${i}-${j}`){
          return e.crit_name_slice
        }
      })
      const crit_choice = cr_obj.map(e =>{
        if(e === undefined){}
        else if(e.id == `${tableNumber}-${i}-${j}`){
          return e.crit_choice_slice
        }
      }); 
        
      
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
  // console.log(filled);
  // console.log(total_filled);
  
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


// const display_filled = "This is the current Consistency Ratio:"
// const display_notfilled = "Please complete the choice matrix to see for the consistency ratio."
let toShowStatus = (total_filled === filled) ;
// useEffect(() => {dispatch(updateAltCR_Ratio({tableNumber, toShowStatus, C_R}))});
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
// async function fetchData(){


// function fetchData(){
//   fetch('http://127.0.0.1:8000/dataHandle/criteria/add/')
//   .then(response => response.json())
//   .then(json => console.log(json));
// }

// const temp = (
//   <button onClick={fetchData}>Click here</button>
// )
// console.log((PWTable_component));
return (
  <> 
   {/* {temp} */}
   <Alt_box tableNumber={tableNumber} toShowStatus = {toShowStatus} C_R ={C_R}/>
   {EigenTable.TableStruct()}
   {PWTable.MultiTableStruct()}
  
   {N_matrixTable.MultiTableStruct()}
  </>
); 
}



export default function Alt_Table({ value, tableNumber }) {
  
  const [updateAltName, setUpdateAltName] = useState([]);

  let size = (value * (value - 1)) / 2;
  let stringTableNum = value.toString();
  let crit_name1 = new Array(size + 1);
  let crit_choice = new Array(size + 1);
  const dispatch = useDispatch();
  let counter = 1;
  for (let i = 1; i <= value - 1; i++) {
    for (let j = i + 1; j <= value; j++) {
      let temp = [
        { key: `${tableNumber}-${i}-${j}-1`, name: `C-${tableNumber}-${i}-${j}`, label: ` Crit ${i}` },
        { key: `${tableNumber}-${i}-${j}-2`, name: `C-${tableNumber}-${i}-${j}`, label: ` Crit ${j}` },
      ];
   
      crit_name1[counter] = temp;
      counter++;
      const id = `${tableNumber}-${i}-${j}`;
      const crit_name_slice = undefined;
      const crit_choice_slice = undefined;
      updateAltName.push({id:id, crit_name_slice : crit_name_slice, crit_choice_slice: crit_choice_slice });          
      // useEffect(() => {
      
        // dispatch(updateAltName({id, crit_name_slice, crit_choice_slice }));
      // }) 
    }
  }

  counter = 1;
  for (let i = 1; i <= value - 1; i++) {
    for (let j = i + 1; j <= value; j++) {
      let temp = new Array(11);
      for (let k = 1; k <= 9; k++) {
        temp[k] = {
          key: `${tableNumber}-${i}-${j}-${k + 2}`,
          name: `O-${tableNumber}-${i}-${j}`,
          label: `${k}`,
        };
      }
      crit_choice[counter] = temp;
      counter++;
      
    }
  }


  const selectName = new Map();
  // const [selectName, setSelectName] = useState(new Map());
  
    const selectChoice = new Map();
// const [selectChoice, setSelectChoice] = useState(new Map());

  const HandleNameChange = (e) => {
    selectName.set(e.target.name, e.target.value);
    // setSelectName(new Map(selectName.set(e.target.name, e.target.value)));
    const id = e.target.value.substring(0, 5);
    const crit_name_slice = e.target.value;
    const crit_choice_slice = selectChoice.get(`O-${id}`);
    const editName = updateAltName.map(e => { 
      // if(e.id === id){
      //   return{
      //     ...e,
      //     crit_name_slice: crit_name_slice,
      //     crit_choice_slice: crit_choice_slice,
      //   }
      // }
    })
    setUpdateAltName(editName);
    // useEffect(() => {
      // dispatch(updateAltName({ id, crit_name_slice, crit_choice_slice }));
    // }) 
  };

  const HandleChoiceChange = (e) => {
    
    // selectChoice.set(new Map(selectChoice.set(e.target.name, e.target.value)));
    const id = e.target.value.substring(0, 5);
    const crit_choice_slice = e.target.value;
    const crit_name_slice = selectName.get(`C-${id}`);
    const editName = updateAltName.map(e => {
      // if(e.id === id){
      //   return{
      //     ...e,
      //     crit_name_slice: crit_name_slice,
      //     crit_choice_slice: crit_choice_slice,
      //   }
      // }
    })
    setUpdateAltName(editName);
    // useEffect(() => {
      // dispatch(updateAltName({ id, crit_name_slice, crit_choice_slice }));
    // }) 
  };

  const tbody = [];
  for (let i = 1; i < crit_name1.length; i++) {
    const name = crit_name1[i];
    const choice = crit_choice[i];
    tbody.push(
      <tr className="matrix_tr w-1/6">
        {name.map((e) => (
          <td className="matrix_td ">
            <label htmlFor={e.key}>
              <input
                type="radio"
                name={e.name}
                value={e.key}
                id={e.key}
                // checked={selectName[e.name] = e.key}
                onChange={HandleNameChange}
                checked= {e.key === selectName.get(e.name)}
              />
              {e.label}
            </label>
          </td>
        ))}
        {choice.map((e) => (
          <td className="matrix_td">
            <label htmlFor={e.key}>
              <input
                type="radio"
                name={e.name}
                value={e.key}
                id={e.key} 
                onChange={HandleChoiceChange}
                // checked={selectChoice[e.name]= e.key}
                checked={e.key === selectChoice.get(e.name)}
               
              />
              {e.label}
            </label>
          </td>
        ))}
      </tr>
    );
  }
  const random_index =[1, 2, 3, 4, 5, 6, 7, 8, 9];
  const random_index_name = ["Equal Importance","Equal to Moderate","Moderate IMP","Moderate to Strong","Strong IMP","Strong to Very Strong","Very Strong IMP","Very Strong to Extreme","Extreme IMPs",];
  const random_index_table = new TableSingleRow(9, random_index_name, random_index, "Criteria Weight Reference");
  //   const [crit_radio]
  return (
    <div class="div-top" key={tableNumber}> 
    {random_index_table.TableStruct()}
      <div className="choice-title text-2xl font-serif font-semibold">Choice Matrix (Enter your choices here)</div> 
      <div class="table-container  div-top">
       
        <table className="matrix_table">
          <thead className="matrix_thead">
            <tr className="matrix_tr">
              <th className="matrix_th w-1/5" colSpan={2}>More Important (1st or 2nd)</th>
              <th className="matrix_th" id="equal">Equal</th>
              <th className="matrix_th w-2/3" colSpan="10">How much More ?</th>
            </tr>
          </thead>
          <tbody className="matrix_tbody">{tbody}</tbody>
        </table>
        {/* <Alt_box tableNumber={tableNumber}/> */}
      </div>
         
        <Normal_matrix value={value} tableNumber={tableNumber} cr_obj={updateAltName}/>
    </div>
  );
}
