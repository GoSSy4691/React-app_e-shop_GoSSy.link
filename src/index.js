import "./index.css";

import React from "react";
import ReactDOM from "react-dom";
import App from "./App.js";
import { BrowserRouter } from "react-router-dom";

import cart from "./files/shop/shopCart.js";
import getMenuItems from "./files/shop/getMenu.js";

let renderSiteDom = () => {
  ReactDOM.render(
    <BrowserRouter>
      <App
        allMenu={getMenuItems(renderSiteDom)}
        cart={cart}
        renderSiteDom={renderSiteDom}
      />
    </BrowserRouter>,
    document.getElementById("root")
  );
};

renderSiteDom();
