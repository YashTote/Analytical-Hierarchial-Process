import React from "react";
import { useDispatch } from "react-redux";
import "./alternative_table.css";
import { useState } from "react";

import { updateName } from "../slices/tableSlice";
// import Normal_matrix from "./normal_matrix";
import Alt_box from "./Alt_Box";

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

export default function Alt_Table({ value, tableNumber }) {
  
  let size = (value * (value - 1)) / 2;

  let crit_name = new Array(size + 1);
  let crit_choice = new Array(size + 1);
  const dispatch = useDispatch();
  const initialNameState = new Map();
  let counter = 1;
  for (let i = 1; i <= value - 1; i++) {
    for (let j = i + 1; j <= value; j++) {
      let temp = [
        { key: `${tableNumber}-${i}-${j}-1`, name: `C-${tableNumber}-${i}-${j}`, label: ` Crit ${i}` },
        { key: `${tableNumber}-${i}-${j}-2`, name: `C-${tableNumber}-${i}-${j}`, label: ` Crit ${j}` },
      ];
   
      crit_name[counter] = temp;
      counter++;
    }
  }

  counter = 1;
  for (let i = 1; i <= value - 1; i++) {
    for (let j = i + 1; j <= value; j++) {
      let temp = new Array(11);
      for (let k = 1; k <= 9; k++) {
        temp[k] = {
          key: `${tableNumber}-${i}-${j}-${k + 2}`,
          name: `${tableNumber}-O-${i}-${j}`,
          label: `${k}`,
        };
      }
      crit_choice[counter] = temp;
      counter++;
    }
  }


//   const selectName = new Map();
  const [selectName, setSelectName] = useState(new Map());
  
  //   const selectChoice = new Map();
const [selectChoice, setSelectChoice] = useState(new Map());

  const handleNameChange = (e) => {
    setSelectName(e.target.name, e.target.value);
    setSelectName(new Map(selectName.set(e.target.name, e.target.value)));
    // console.log(e.target.name, e.target.value);
    console.log(selectName.get(e.target.name));
    const id = e.target.value.substring(0, 3);
    const crit_name_slice = e.target.value;
    // const crit_name_slice = selectName.get(`C-${id}`);
     
    // dispatch(updateName({ id, crit_name_slice, crit_choice_slice }));
  };

  const handleChoiceChange = (e) => {
    setSelectChoice(new Map(selectChoice.set(e.target.name, e.target.value)));
    
    const id = e.target.value.substring(0, 3);
    const crit_choice_slice = e.target.value;
  

    // dispatch(updateName({ id, crit_name_slice, crit_choice_slice }));
  };

  const tbody = [];
  for (let i = 1; i < crit_name.length; i++) {
    const name = crit_name[i];
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
                onChange={handleNameChange}
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
                // checked={selectChoice[e.name]= e.key}
                checked={e.key === selectChoice.get(e.name)}
                onChange={handleChoiceChange}
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
        <Alt_box/>
      </div>
    
        {/* <Normal_matrix value={value} /> */}
    </div>
  );
}
