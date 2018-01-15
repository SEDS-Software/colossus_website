/*
    ./client/index.js
*/
import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App.jsx';
require("react-bootstrap");
import style from "./scss/stylesheet.scss";

ReactDOM.render(<App />, document.getElementById('root'));
