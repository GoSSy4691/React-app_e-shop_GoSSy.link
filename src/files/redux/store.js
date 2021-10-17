import { createStore } from "redux";
import { persistStore } from "redux-persist";
import rootReducer from "./rootReducers.js";

export const store = createStore(rootReducer);
export const persist = persistStore(store);
