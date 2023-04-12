import { combineReducers, configureStore } from "@reduxjs/toolkit";
import {persistReducer,  persistStore} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import tableReducer from "./slices/tableSlice"
import CrReducer from "./slices/CR_RatioSlice"
import eigenReducer from "./slices/eigenSlice"
import CrAndAltReducer from "./slices/CrAndAltValueSlice"

const persistConfig = {
    key: 'root',
    storage,
}

const rootReducer  = combineReducers({
    crit: tableReducer,
    CR_Ratio: CrReducer,
    eigenStore : eigenReducer,
    CrAndAltValue : CrAndAltReducer,

});

const persistedReducer =  persistReducer(persistConfig, rootReducer);


export default () => {
    const store = configureStore({
        reducer : persistedReducer,
    });
    const persistor = persistStore(store);
    return{ store, persistor};
}
// export default configureStore({
//     reducer:{
//         crit: tableReducer,
//         CR_Ratio: CrReducer,
//         eigenStore : eigenReducer,
//         CrAndAltValue : CrAndAltReducer,
//     },
// })