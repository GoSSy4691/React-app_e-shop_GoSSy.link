import { createStore, combineReducers } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { cartReducer } from "./cartStore.js";
import { menuReducer } from "./menuStore.js";
import { userDataReducer } from "./userStore.js";
import { errorDataReducer } from "./errorStore";

const rootReducer = combineReducers({
  cart: cartReducer,
  menu: menuReducer,
  userData: userDataReducer,
  errorData: errorDataReducer,
});

export const store = createStore(rootReducer, composeWithDevTools());
