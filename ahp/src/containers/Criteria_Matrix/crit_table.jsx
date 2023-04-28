import React, { useState } from "react";
import { useDispatch,useSelector } from "react-redux";
import "./crit_table.css";
import MyModal from "../../field_names";
import { updateName } from "../../slices/tableSlice";
import Normal_matrix from "./normal_matrix";
import Cr_box from "./Cr_Box";

class TableSingleRow {
  constructor(width, criteriaName, tableData, tableTitle) {
    this.width = width;
    this.criteriaName = criteriaName;
    this.tableData = tableData;
    this.tableTitle = tableTitle;
  }
  //If the criteriaName comes as an Array, we can easily map over each element and create an variable that holds the thead structure.

  TableStruct() {
    const titleRow = this.criteriaName.map((e) => (
      <th className="border border-slate-600 bg-slate-300">{e}</th>
    ));
    const valueRow = this.tableData.map((e) => (
      <td className="border border-slate-700 bg-slate-50 ">{e}</td>
    ));
    const tableStruct = (
      <div className="TableSingleRow font-serif">
        <div className="text-2xl font-semibold">{this.tableTitle}</div>
        <table className="tableStruct w-2/3 text-lg border-collapse border border-slate-500 bg-slate-300">
          <thead>
            <tr>
              <th className="border w-1/5 border-slate-600 bg-slate-300 ">
                Criteria Name
              </th>
              {titleRow}
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border font-semibold border-slate-600 bg-slate-300">
                Values
              </td>
              {valueRow}
            </tr>
          </tbody>
        </table>
      </div>
    );

    return tableStruct;
  }
}

export default function Crit_Table({ value, tableNumber }) {
  
  let size = (value * (value - 1)) / 2;

  let crit_name = new Array(size + 1);
  let crit_choice = new Array(size + 1);
  // console.log(exportAltName)
  // console.log(exportCritName)
  
  
  const dispatch = useDispatch();
  let jsonCriteria = localStorage.getItem('jsonCriteria');
  jsonCriteria = JSON.parse(jsonCriteria);
  // console.log(printthis);
  let jsonAlternative = localStorage.getItem('jsonAlternative');
  jsonAlternative = JSON.parse(jsonAlternative);

  const initialNameState = new Map();
  let counter = 1;
  for (let i = 1; i <= value - 1; i++) {
    for (let j = i + 1; j <= value; j++) {
      let name1='ff', name2='gg';
      if(tableNumber == 0){
           name1 = (jsonCriteria[i] == undefined) ? ` Crit ${i} ` : jsonCriteria[i];
           name2 = (jsonCriteria[j] == undefined) ? ` Crit ${j}` :  jsonCriteria[j];
      }
      else
      {
        name1 = (jsonAlternative[i] == undefined) ? ` Alt ${i} ` : jsonAlternative[i];
        name2 = (jsonAlternative[j] == undefined) ? ` Alt ${j}` : jsonAlternative[j];
      }
      let temp = [
        {
          key: `${tableNumber}-${i}-${j}-1`,
          name: `C-${tableNumber}-${i}-${j}`,
          label: " " + name1,
        },
        {
          key: `${tableNumber}-${i}-${j}-2`,
          name: `C-${tableNumber}-${i}-${j}`,
          label: " " + name2,
        },
      ];
      initialNameState.set(`${i}-${j}`, `${i}-${j}-2`);
      crit_name[counter] = temp;
      counter++;
      const id = `${tableNumber}-${i}-${j}`;
      const crit_name_slice = undefined;
      const crit_choice_slice = undefined;
      // console.log(id);
      dispatch(updateName({ id, crit_name_slice, crit_choice_slice }));
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
  const selectChoice = new Map();

  const handleNameChange = (e) => {
    selectName.set(e.target.name, e.target.value);
    const id = e.target.value.substring(0, 5);
    const first = id.substring(1, 2);
    // setTrigger(e.target.value)
    // if(first === "-"){
    //   id= e.target.value.substring(0,4);
    // }
    const crit_name_slice = e.target.value;
    const crit_choice_slice = selectChoice.get(`O-${id}`);

    dispatch(updateName({ id, crit_name_slice, crit_choice_slice }));
  };

  const handleChoiceChange = (e) => {
    selectChoice.set(e.target.name, e.target.value);
    const id = e.target.value.substring(0, 5);
    const first = id.substring(1, 2);
    // if(first === "-"){
    //   id= e.target.value.substring(0,4);
    // }
    // setTrigger(e.target.value);
    const crit_choice_slice = e.target.value;
    // console.log(`C-${id}`);
    const crit_name_slice = selectName.get(`C-${id}`);
    // console.log(crit_name_slice, id);
    dispatch(updateName({ id, crit_name_slice, crit_choice_slice }));
  };

  const tbody = [];
  for (let i = 1; i < crit_name.length; i++) {
    const name = crit_name[i];
    const choice = crit_choice[i];
    tbody.push(
      <tr className="matrix_tr">
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
                onChange={handleChoiceChange}
              />
              {e.label}
            </label>
          </td>
        ))}
      </tr>
    );
  }
  const random_index = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  const random_index_name = [
    "Equal Importance",
    "Equal to Moderate",
    "Moderate IMP",
    "Moderate to Strong",
    "Strong IMP",
    "Strong to Very Strong",
    "Very Strong IMP",
    "Very Strong to Extreme",
    "Extreme IMPs",
  ];
  const random_index_table = new TableSingleRow(
    9,
    random_index_name,
    random_index,
    "Criteria Weight Reference"
  );
  //   const [crit_radio]
  return (
    <div class="div-top">
      {random_index_table.TableStruct()}
      <div className="choice-title text-2xl font-serif font-semibold">
        Choice Matrix (Enter your choices here)
      </div>
      <div class="table-container  div-top">
        <table className="matrix_table">
          <thead className="matrix_thead">
            <tr className="matrix_tr">
              <th className="matrix_th" colSpan={2}>
                More Important (1st or 2nd)
              </th>
              <th className="matrix_th" id="equal">
                Equal
              </th>
              <th className="matrix_th" colSpan="10">
                How much More ?
              </th>
            </tr>
          </thead>
          <tbody className="matrix_tbody">{tbody}</tbody>
        </table>

        <Cr_box />
      </div>

      <Normal_matrix value={value} tableNumber={tableNumber} />
    </div>
  );
}
