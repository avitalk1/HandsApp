import React from "react";
import "../index.css";
import { Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Route } from "react-router-dom";
import { Link as RouterLink } from "react-router-dom";
import landingPageImg from "../images/landingPageImg.png"
import MobileLogo from "../images/MobileLogo.png"

const useStyles = makeStyles({
  root: {
    minWidth: "100%",
    minHeight: "100vh",
    background: "linear-gradient(60.98deg, #07889B -20.33%, #66B9BF 65.38%, #FF9AF5 150.11%)",
    position: "relative"
  },
  container: {
    display: "flex",
    justifyContent: "space-between",
  },
  logoImg: {
    width: "50%",
    height: "40%",
    marginTop: "25%",
    marginLeft: "25%",
    marginBottom:"5%"
  },
  buttons: {
    marginTop:"20%"
  },
  button: {
    width: "80%",
    marginLeft: "10%",
    background: "#F4976C",
    color: "white",
    boxShadow: "0px 5px 10px rgba(0, 0, 0, 0.25)",
    fontSize: "24px",
    marginBottom: "13%",
    borderRadius: "5px",
    display: "flex",
    flexDirection: "column"
  }

});

export default function LandingPage() {
  const classes = useStyles();
  return (

    <div className={classes.root}>
      <div className={classes.container}>
        <div>
          <img src={MobileLogo} className={classes.logoImg} alt="landing-page-image" />
          <div className={classes.buttons} >
            <Route>
              <Button
                variant="contained"
                className={classes.button}
                component={RouterLink}
                to={{
                  pathname: "/connection/signup",
                  state: { connectionType: "signup"}
                }}
              >
                Sign up
            </Button>
              <Button variant="contained" className={classes.button}
                component={RouterLink}
                to={{
                  pathname: "/connection/login",
                  state: { connectionType: "login" }
                }}
              >
                Login
            </Button>
            </Route>
          </div>
        </div>
      </div>
    </div>

  );
}
