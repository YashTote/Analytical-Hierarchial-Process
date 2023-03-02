import { createSlice } from "@reduxjs/toolkit";

// value to be imported from the user input MODAL


const initialState = {};

const nameSlice = createSlice({
 name:'critTable',
 initialState,
 reducers:{
    updateName:(state, action) => 
    {
      // console.log(action.payload);
      const {id, crit_name, crit_choice} = action.payload;
      state[id] = {"crit_name":crit_name, "crit_choice": crit_choice};
      // state.set(id, {"crit_name":crit_name, "crit_choice": crit_choice});
    }
    }
 }
    )

export const{updateName} = nameSlice.actions;
export default nameSlice.reducer;

