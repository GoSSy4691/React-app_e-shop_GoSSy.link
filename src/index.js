import "./index.css";

import React from "react";
import ReactDOM from "react-dom";
import App from "./App.js";
import { BrowserRouter } from "react-router-dom";

import cart from "./files/shop/shopCart.js";
import getMenuItems from "./files/shop/getMenu.js";

ReactDOM.render(
  <BrowserRouter>
    <App allMenu={getMenuItems} cart={cart} />
  </BrowserRouter>,
  document.getElementById("root")
);
