import { configureStore } from "@reduxjs/toolkit";
import tableReducer from "./slices/tableSlice"
import CrReducer from "./slices/CR_RatioSlice"
import eigenReducer from "./slices/eigenSlice"

export default configureStore({
    reducer:{
        crit: tableReducer,
        CR_Ratio: CrReducer,
        eigenStore : eigenReducer,
    },
})