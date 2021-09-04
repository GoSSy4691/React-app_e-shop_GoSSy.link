import { createStore, combineReducers } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { cartReducer } from "./cartStore.js";
import { menuReducer } from "./menuStore.js";
import { userDataReducer } from "./userState.js";

const rootReducer = combineReducers({
  cart: cartReducer,
  menu: menuReducer,
  userData: userDataReducer,
});

export const store = createStore(rootReducer, composeWithDevTools());
