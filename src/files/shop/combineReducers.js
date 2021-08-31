import { createStore, combineReducers } from "redux";
import { cartReducer } from "./cartStore.js";
import { menuReducer } from "./menuStore.js";
import { cartShowReducer } from "./cartShowState.js";

const rootReducer = combineReducers({
  cart: cartReducer,
  menu: menuReducer,
  isCartShow: cartShowReducer,
});

export const store = createStore(rootReducer);
