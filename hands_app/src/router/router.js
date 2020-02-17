import React from "react";
import { Route } from "react-router-dom";
import LandingPage from "../pages/landingPage";
import Signup from "../pages/Signup";
const ReactRouter = () => {
  return (
    <React.Fragment>
      <Route exact path="/" component={LandingPage} />
      <Route exact path="/signup" component={Signup} />
    </React.Fragment>
  );
};

export default ReactRouter;
