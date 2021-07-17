import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.js';

let render = () => {
    ReactDOM.render(
            <App/>,
        document.getElementById('root')
    );
};

export default render;