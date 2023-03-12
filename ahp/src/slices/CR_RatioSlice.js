import { createSlice } from "@reduxjs/toolkit";

let initialState = {};

const CR_Ratio = createSlice({
  name: "CR_Ratio",
  initialState,
  reducers: {
    updateCR_Ratio: (state, action) => {
      const {toShowStatus, C_R} = action.payload;
      state[0] = {"current_status": toShowStatus, "C_R": C_R};
    },
  },
});

export const { updateCR_Ratio } = CR_Ratio.actions;
export default CR_Ratio.reducer;
