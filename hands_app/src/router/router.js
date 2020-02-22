import React from "react";
import { Route } from "react-router-dom";
import LandingPage from "../pages/LandingPage";
import UserConnect from "../pages/UserConnect";
import Posts from "../pages/Posts";
import AdminInbox from "../pages/AdminInbox";
import CreatePostPage from "../pages/CreatePostPage"
import Request from "../pages/Request"
const ReactRouter = () => {
  return (
    <React.Fragment>
      <Route exact path="/" component={LandingPage} />
      <Route path="/connection" render={(props) => <UserConnect {...props}/>} /> 
      <Route path="/posts" render={(props) => <Posts {...props}/>}/>
      <Route path="/admin" render={(props) => <AdminInbox {...props}/>}/>
      <Route path="/createpost" render={(props) => <CreatePostPage {...props}/>}/>
      <Route path="/request" render={(props) => <Request {...props}/>}/>
    </React.Fragment>
  );
};

export default ReactRouter;
