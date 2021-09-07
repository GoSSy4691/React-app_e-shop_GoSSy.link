import { createStore, combineReducers } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { cartReducer } from "./cartStore.js";
import { menuReducer } from "./menuStore.js";
import { userReducer } from "./userStore.js";
import { errorReducer } from "./errorStore";

const rootReducer = combineReducers({
  cart: cartReducer,
  menu: menuReducer,
  user: userReducer,
  error: errorReducer,
});

export const store = createStore(rootReducer, composeWithDevTools());
