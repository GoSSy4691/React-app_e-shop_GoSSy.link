import { createStore } from "redux";
import { persistStore } from "redux-persist";
import { composeWithDevTools } from "redux-devtools-extension";
import rootReducer from "./rootReducers.js";

export const store = createStore(rootReducer, composeWithDevTools());
export const persist = persistStore(store);
