import React from "react";
import { Route } from "react-router-dom";
import LandingPage from "../pages/LandingPage";
import UserConnect from "../pages/UserConnect";
const ReactRouter = () => {
  return (
    <React.Fragment>
      
      <Route exact path="/" component={LandingPage} />
      <Route path="/connection" render={(props) => <UserConnect {...props}/>} /> 
    </React.Fragment>
  );
};

export default ReactRouter;
