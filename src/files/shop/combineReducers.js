import { createStore, combineReducers } from "redux";
import { cartReducer } from "./cartStore.js";
import { menuReducer } from "./menuStore.js";

const rootReducer = combineReducers({
  cart: cartReducer,
  menu: menuReducer,
});

export const store = createStore(rootReducer);
