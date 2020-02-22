import React from "react";
import { Route } from "react-router-dom";
import LandingPage from "../pages/LandingPage";
import UserConnect from "../pages/UserConnect";
import AdminImbox from "../pages/AdminInbox";
import Posts from "../pages/Posts";
import AdminInbox from "../pages/AdminInbox";
const ReactRouter = () => {
  return (
    <React.Fragment>
      <Route exact path="/" component={LandingPage} />
      <Route path="/connection" render={(props) => <UserConnect {...props}/>} /> 
      <Route path="/posts" render={(props) => <Posts {...props}/>}/>
      <Route path="/admin" render={(props) => <AdminInbox {...props}/>}/>
    </React.Fragment>
  );
};

export default ReactRouter;
