import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from 'redux-persist/lib/storage';
import storageSession from "redux-persist/lib/storage/session";

import { cartReducer } from "./cartStore.js";
import { menuReducer } from "./menuStore.js";
import { userReducer } from "./userStore.js";
import { errorReducer } from "./errorStore.js";
import { adminReducer } from "./adminStore.js";
import { settingsReducer } from "./settingsStore.js";

const sessionPersistConfig = {
  key: "root",
  storage: storageSession,
  whitelist: ["cart"],
};

const localPersistConfig = {
  key: "settings",
  storage: storage,
}

const rootReducer = combineReducers({
  cart: cartReducer,
  menu: menuReducer,
  user: userReducer,
  error: errorReducer,
  admin: adminReducer,
  settings: persistReducer(localPersistConfig, settingsReducer)
});

export default persistReducer(sessionPersistConfig, rootReducer);
