import './index.css';

import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.js';
import {BrowserRouter} from 'react-router-dom';

import shopCart, {addFood} from './files/shop/shopCart.js';
import allMenu, {updateDom_allMenu} from './files/shop/getMenu.js';

let renderSiteDom = () => {
  ReactDOM.render(
    <React.StrictMode>
      <BrowserRouter>
        <App
          allMenu={allMenu()}
          shopCart={shopCart.cart}
          addFood={addFood}
          renderSiteDom={renderSiteDom}
        />
      </BrowserRouter>
    </React.StrictMode>,
    document.getElementById('root')
  );
};

renderSiteDom();
updateDom_allMenu(renderSiteDom);