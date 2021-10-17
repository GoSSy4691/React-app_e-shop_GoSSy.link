import { createStore, combineReducers } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage/session";
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

const persistConfig = {
  key: "root",
  storage: storage,
  whitelist: [cart, user], // only navigation will be persisted
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export let store = createStore(persistedReducer, composeWithDevTools());
export let persistor = persistStore(store);
