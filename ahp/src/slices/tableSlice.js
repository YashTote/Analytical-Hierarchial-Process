import { createSlice } from "@reduxjs/toolkit";

const initialState = {};

const nameSlice = createSlice({
 name:'critTable',
 initialState,
 reducers:{
    updateName:(state, action) => 
    {
      const {id, crit_name_slice, crit_choice_slice} = action.payload;
      state[id] = {"crit_name_slice":crit_name_slice, "crit_choice_slice": crit_choice_slice}; 
    }
    }
 }
    )

   

export const{updateName} = nameSlice.actions;
export default nameSlice.reducer;

