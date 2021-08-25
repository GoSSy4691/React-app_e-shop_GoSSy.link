import "./index.css";
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import App from "./App.js";
import getMenu from "./files/shop/getMenu.js";
import { store } from "./files/shop/cartStore.js";

ReactDOM.render(
  <BrowserRouter>
    <Provider store={store}>
      <App getMenu={getMenu} />
    </Provider>
  </BrowserRouter>,
  document.getElementById("root")
);
