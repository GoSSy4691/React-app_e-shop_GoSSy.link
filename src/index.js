import "./index.css";

import React from "react";
import ReactDOM from "react-dom";
import App from "./App.js";
import { BrowserRouter } from "react-router-dom";

import cart from "./files/shop/shopCart.js";
import getMenu from "./files/shop/getMenu.js";

ReactDOM.render(
  <BrowserRouter>
    <App getMenu={getMenu} cart={cart} />
  </BrowserRouter>,
  document.getElementById("root")
);
