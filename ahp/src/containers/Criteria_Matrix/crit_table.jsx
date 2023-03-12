import React, { useE } from "react";
import { useDispatch } from "react-redux";
import "./crit_table.css";
import Cr_Ratio from "../../verify/cr_ratio";
import { updateName } from "../../slices/tableSlice";
import Normal_matrix from "./normal_matrix";
import Cr_box from "./Cr_Box";

export default function Crit_Table({ value }) {
  // value = 5;
  let size = (value * (value - 1)) / 2;

  let crit_name = new Array(size + 1);
  let crit_choice = new Array(size + 1);
  const dispatch = useDispatch();
  const initialNameState = new Map();
  let counter = 1;
  for (let i = 1; i <= value - 1; i++) {
    for (let j = i + 1; j <= value; j++) {
      let temp = [
        { key: `${i}-${j}-1`, name: `C-${i}-${j}`, label: ` Crit ${i}` },
        { key: `${i}-${j}-2`, name: `C-${i}-${j}`, label: ` Crit ${j}` },
      ];
      initialNameState.set(`${i}-${j}`, `${i}-${j}-2`);
      crit_name[counter] = temp;
      counter++;
      const id = `${i}-${j}`;
      const crit_name_slice = undefined;
      const crit_choice_slice = undefined;
      dispatch(updateName({ id, crit_name_slice, crit_choice_slice }));
    }
  }

  counter = 1;
  for (let i = 1; i <= value - 1; i++) {
    for (let j = i + 1; j <= value; j++) {
      let temp = new Array(11);
      for (let k = 1; k <= 9; k++) {
        temp[k] = {
          key: `${i}-${j}-${k + 2}`,
          name: `O-${i}-${j}`,
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
    const id = e.target.value.substring(0, 3);
    const crit_name_slice = e.target.value;
    const crit_choice_slice = selectChoice.get(`O-${id}`);

    dispatch(updateName({ id, crit_name_slice, crit_choice_slice }));
  };

  const handleChoiceChange = (e) => {
    selectChoice.set(e.target.name, e.target.value);
    const id = e.target.value.substring(0, 3);
    const crit_choice_slice = e.target.value;
    const crit_name_slice = selectName.get(`C-${id}`);

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

  //   const [crit_radio]
  return (
    <div class="div-top">
      <div class="table-container  div-top">
        <table className="matrix_table">
          <thead className="matrix_thead">
            <tr className="matrix_tr">
              <th className="matrix_th" colSpan={2}>More Important (1st or 2nd)</th>
              <th className="matrix_th" id="equal">Equal</th>
              <th className="matrix_th" colSpan="10">How much More ?</th>
            </tr>
          </thead>
          <tbody className="matrix_tbody">{tbody}</tbody>
        </table>
        <Cr_box/>
      </div>
        <Normal_matrix value={value} />
    </div>
  );
}
