import { configureStore } from "@reduxjs/toolkit";
import tableReducer from "./slices/tableSlice"
import CrReducer from "./slices/CR_RatioSlice"


export default configureStore({
    reducer:{
        crit: tableReducer,
        CR_Ratio: CrReducer,
    }
})