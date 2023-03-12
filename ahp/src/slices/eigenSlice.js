import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

const eigenSlice = createSlice({
    name: 'eigenUpdate',
    initialState,
    reducers: {
        updateEigen : (state, action) => {
          const newEigen = action.payload;
          return[...state, newEigen];      
        }
    }
})


export const {updateEigen} = eigenSlice.actions;
export default eigenSlice.reducer;