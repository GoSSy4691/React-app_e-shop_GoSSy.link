import './index.css';

import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.js';
import {BrowserRouter} from 'react-router-dom';

import shopCart, {addFood} from './files/shop/shopCart.js';
import getMenuItems from './files/shop/getMenu.js';

let renderSiteDom = () => {
  ReactDOM.render(
    <React.StrictMode>
      <BrowserRouter>
        <App
          allMenu={getMenuItems(renderSiteDom)}
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