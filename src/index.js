import "./index.css";
import React, { Suspense } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import "./i18n";
import { store, persist } from "./files/redux/store.js";
import App from "./App.jsx";

ReactDOM.render(
  <Suspense fallback="...">
    <BrowserRouter>
      <Provider store={store}>
        <PersistGate persistor={persist}>
          <App />
        </PersistGate>
      </Provider>
    </BrowserRouter>
  </Suspense>,
  document.getElementById("root")
);
