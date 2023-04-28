import { createSlice } from "@reduxjs/toolkit";

let initialState = {};

const CR_Ratio = createSlice({
  name: "CR_Ratio",
  initialState,
  reducers: {
    updateAltCR_Ratio: (state, action) => {
      const {tableNumber, toShowStatus, C_R} = action.payload;
      state[tableNumber] = {"current_status": toShowStatus, "C_R": C_R};
      
    },
  },
});

export const { updateAltCR_Ratio } = CR_Ratio.actions;
export default CR_Ratio.reducer;
