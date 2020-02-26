
import React, {useState, useEffect} from "react";
import { Route } from "react-router-dom";
import LandingPage from "../pages/LandingPage";
import MobileLandingPage from "../Mobile/MobileLandingPage";
import UserConnect from "../pages/UserConnect";
import UserLogin from "../Mobile/UserLogin";
import Posts from "../pages/Posts";
import MobilePosts from "../Mobile/MobilePosts";
import AdminInbox from "../pages/AdminInbox";
import Map from '../Mobile/Map';
import CreatePostPage from "../pages/CreatePostPage"
import Request from "../pages/Request"
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Footer from '../Components/Footer';

const ReactRouter = () => {
  const matches = useMediaQuery('(min-width:415px)');
  const [currentLocation, setCurrentLocation] = useState(window.location.pathname);
  const [homePage, setHomePage] = useState(-1);

  const setHomePageFunction = () =>{
    setHomePage(homePage-1);
  }

  if(matches===true){
    return (
      <React.Fragment>
        <Route exact path="/" component={LandingPage} />
        <Route path="/connection" render={(props) => <UserConnect {...props}/>} /> 
        <Route path="/posts" render={(props) => <Posts {...props}/>}/>
        <Route path="/admin" render={(props) => <AdminInbox {...props}/>}/>
        <Route path="/createpost" render={(props) => <CreatePostPage {...props}/>}/>
        <Route path="/request" render={(props) => <Request {...props}/>}/>
        <Footer/>
      </React.Fragment>
    );
  }
  else{
    return(
      <React.Fragment>
        <Route exact path="/" render={(props) => <MobileLandingPage {...props } onPageLoad={setCurrentLocation}/>} />
        <Route path="/connection" render={(props) => <UserLogin {...props } onPageLoad={setCurrentLocation}/>} />
        <Route path="/posts" render={(props) => <MobilePosts {...props} selectedIndex={homePage} onPageLoad={setCurrentLocation}/>}/> 
        <Route path="/map" render={(props) => <Map {...props}/>}/>
        <Footer location={currentLocation} onHomeClick={setHomePageFunction}/>
      </React.Fragment>

    );
  }
 
};

export default ReactRouter;


