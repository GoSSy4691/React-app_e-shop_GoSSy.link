import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.js';
import {BrowserRouter} from 'react-router-dom';

import shopCart, {addFood} from './files/shop/shopCart.js'
import allMenu from './files/shop/getMenu.js';

let render = () => {
  ReactDOM.render(
    <React.StrictMode>
      <BrowserRouter>
        <App
          shopCart={shopCart.cart}
          addFood={addFood}
          allMenu={allMenu()}
        />
      </BrowserRouter>
    </React.StrictMode>,
    document.getElementById('root')
  );
};

export default render;