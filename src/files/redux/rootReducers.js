import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storageSession from "redux-persist/lib/storage/session";

import { cartReducer } from "./cartStore.js";
import { menuReducer } from "./menuStore.js";
import { userReducer } from "./userStore.js";
import { errorReducer } from "./errorStore.js";

const persistConfig = {
  key: "root",
  storage: storageSession,
  whitelist: ["cart", "user"],
};

const rootReducer = combineReducers({
  cart: cartReducer,
  menu: menuReducer,
  user: userReducer,
  error: errorReducer,
});

export default persistReducer(persistConfig, rootReducer);
