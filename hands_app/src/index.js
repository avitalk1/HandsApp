import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { BrowserRouter as Router } from 'react-router-dom';
import ReactRouter from './router/router';
import * as serviceWorker from './serviceWorker';
import logo from './images/logo.png';
import 'typeface-roboto'
ReactDOM.render(
    <Router>
            <img src={logo} className="logo" alt="logo" />
        <ReactRouter />
    </Router>
    , document.getElementById('root')
)

serviceWorker.unregister();
