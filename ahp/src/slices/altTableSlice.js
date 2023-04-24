import { createSlice } from "@reduxjs/toolkit";

const initialState = {};

const nameSlice = createSlice({
 name:'critTable',
 initialState,
 reducers:{
    updateAltName:(state, action) => 
    {
      const {id, crit_name_slice, crit_choice_slice} = action.payload;
      console.log(action.payload);
      state[id] = {"crit_name_slice":crit_name_slice, "crit_choice_slice": crit_choice_slice}; 
    }
    }
 })

export const {updateAltName} = nameSlice.actions;
export default nameSlice.reducer;

