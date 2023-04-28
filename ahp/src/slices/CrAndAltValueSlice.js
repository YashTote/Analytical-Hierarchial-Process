import { createSlice } from "@reduxjs/toolkit";

let initialState = {};

const CrAlt = createSlice({
  name: "CrAlt",
  initialState,
  reducers: {
    getCrAndAltValue: (state, action) => { 
      const {var1, var2} = action.payload;
      state[0] = {"CritValue" : var1 , "AltValue" : var2};
      // console.log(state[0])
    },
  },
});

export const { getCrAndAltValue } = CrAlt.actions;
export default CrAlt.reducer;
