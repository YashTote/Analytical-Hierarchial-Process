import { combineReducers, configureStore } from "@reduxjs/toolkit";
import {persistReducer,  persistStore} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import tableReducer from "./slices/tableSlice"
import CrReducer from "./slices/CR_RatioSlice"
import eigenReducer from "./slices/eigenSlice"
import CrAndAltReducer from "./slices/CrAndAltValueSlice"
import AltTableReducer from './slices/altTableSlice'
import AltCrRatioSlice from './slices/Alt_CR_RatioSlice'


const persistConfig = {
    key: 'root',
    storage,
}

const rootReducer  = combineReducers({
    crit: tableReducer,
    CR_Ratio: CrReducer,
    Alt_CR_Ratio : AltCrRatioSlice,
    eigenStore : eigenReducer,
    CrAndAltValue : CrAndAltReducer,
    AltCrit : AltTableReducer,
    
});

const persistedReducer =  persistReducer(persistConfig, rootReducer);


export default () => {
    const store = configureStore({
        reducer : persistedReducer,
    });
    const persistor = persistStore(store);
    return{ store, persistor};
}
