import React from "react";
import { Route } from "react-router-dom";
import LandingPage from "../pages/LandingPage";
import MobileLandingPage from "../Mobile/MobileLandingPage";
import UserConnect from "../pages/UserConnect";
import UserLogin from "../Mobile/UserLogin";
import Posts from "../pages/Posts";
import Post from "../Mobile/Post";
import MobilePosts from "../Mobile/MobilePosts";
import AdminInbox from "../pages/AdminInbox";
import Map from '../Mobile/Map';
import CreatePostPage from "../pages/CreatePostPage"
import Request from "../pages/Request"
import useMediaQuery from '@material-ui/core/useMediaQuery';

const ReactRouter = () => {
  const matches = useMediaQuery('(min-width:415px)');
  
  if(matches===true){
    return (
      <React.Fragment>
        <Route exact path="/" component={LandingPage} />
        <Route path="/connection" render={(props) => <UserConnect {...props}/>} /> 
        <Route path="/posts" render={(props) => <Posts {...props}/>}/>
        <Route path="/admin" render={(props) => <AdminInbox {...props}/>}/>
        <Route path="/createpost" render={(props) => <CreatePostPage {...props}/>}/>
        <Route path="/request" render={(props) => <Map {...props}/>}/>
      </React.Fragment>
    );
  }
  else{
    return(
      <React.Fragment>
        <Route exact path="/" component={MobileLandingPage} />
        <Route path="/connection" render={(props) => <UserLogin {...props}/>} />
        <Route path="/posts" render={(props) => <MobilePosts {...props}/>}/> 
        <Route path="/post" render={(props) => <Post {...props}/>}/>
        <Route path="/map" render={(props) => <Map {...props}/>}/>
      </React.Fragment>

    );
  }
 
};

export default ReactRouter;


