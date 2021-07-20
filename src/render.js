import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.js';
import {BrowserRouter} from 'react-router-dom';

import menuItems from './files/shop/shop.json';

let render = () => {
  ReactDOM.render(
    <React.StrictMode>
      <BrowserRouter>
        <App menuItems={menuItems}/>
      </BrowserRouter>
    </React.StrictMode>,
    document.getElementById('root')
  );
};

export default render;