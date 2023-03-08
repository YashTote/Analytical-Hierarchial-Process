import { createSlice } from "@reduxjs/toolkit";

let initialState = 0;

const CR_Ratio = createSlice({
  name: "CR_Ratio",
  initialState,
  reducers: {
    updateCR_Ratio: (state, action) => ({
      state : action.payload
    }),
  },
});

export const { updateCR_Ratio } = CR_Ratio.actions;
export default CR_Ratio.reducer;
