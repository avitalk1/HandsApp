import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { BrowserRouter as Router } from 'react-router-dom';
import ReactRouter from './router/router';
import * as serviceWorker from './serviceWorker';
import logo from './images/logo.png';
import 'typeface-roboto'
// import Posts from './pages/Posts'
// import AdminInbox from './pages/AdminInbox'
// import RequestForm from './Components/RequestForm'
// import CreatePost from './Components/Post/CreatePostForm'
// import PostPhotos from './Components/Post/PostPhotos'
// import CreatePostPage from './pages/CreatePostPage'
// import RequestPage from './pages/Request'

ReactDOM.render(
    <Router>
        <img src={logo} className="logo" alt="logo" />
        <ReactRouter />
    </Router>,
    document.getElementById('root')
)
//ReactDOM.render(<CreatePostPage />, document.getElementById('root'));


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
