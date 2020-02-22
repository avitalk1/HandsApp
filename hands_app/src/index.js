import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { BrowserRouter as Router } from 'react-router-dom';
import ReactRouter from './router/router';
import * as serviceWorker from './serviceWorker';
import Footer from './Components/Footer';
import logo from './images/logo.png';
import Posts from './pages/Posts'
import AdminInbox from './pages/AdminInbox'
import RequestForm from './Components/RequestForm'
// ReactDOM.render(
//     <Router>
//         <img src={logo} className="logo" alt="logo" />
//         <ReactRouter />
//         <Footer/>
//     </Router>,
//     document.getElementById('root')

// )
ReactDOM.render(<RequestForm />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
