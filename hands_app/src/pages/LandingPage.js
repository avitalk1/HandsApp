import React ,{useState, useEffect} from "react";
import "../index.css";
import { Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Route } from "react-router-dom";
import { Link as RouterLink } from "react-router-dom";
import landingPageImg from "../images/landingPageImg.png"
import CostumeSnackbar from "../Components/CostumSnackbar";
const useStyles = makeStyles({
  root: {
    minWidth: "100%",
    minHeight: "90vh",
    background: "linear-gradient(248.35deg,#b4dfe5 1.55%, #07889b 95.8%)",
    position:"relative"
  },
  container: { 
    display:"flex",
    justifyContent:"space-between"
  },
  leftColumn: {
    maxWidth: "50%",
    position: "relative",
    height: "40vh",
    top: "20vh",
    left: 123,
    color: "#FFCB9A",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-evenly"
  },
  first_par: {
    margin: 0,
    fontSize: 50,
    maxWidth: "80%"
  },
  second_par: {
    margin: 0,
    fontSize: 24,
    maxWidth: "70%",
    marginTop:"5%",
    marginBottom:"5%"
  },
  button: {
    width: 250,
    height: 50,
    borderRadius: 10,
    color: "#FFCB9A",
    background: "#66B9Bf",
    marginRight: 85,
    "&:hover": {
      background: "#66B9Bf",
      filter: "brightness(80%)"
    }
  },
  loginLink:{
    position:"absolute",
    top:"6%",
    right:"8%",
    textDecoration:"none",
    color:"white",
    fontSize:"30px",
    zIndex:2
  },
  landingPageImg:{
    mixBlendMode:"multiply",
    width:"40%",
    marginTop:"5%"
  }

});

export default function LandingPage(props) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <RouterLink className={classes.loginLink} to={{
                pathname: "/connection/login",
                state: { connectionType: "login" }
              }} >Login</RouterLink>
      <div className={classes.container}>
      <div className={classes.leftColumn}>
        <p className={classes.first_par}>LET'S DO SOMETHING GOOD TODAY!</p>
        <p className={classes.second_par}>
          A platform that connects between people who need help, and people who
          want to help
        </p>
        <div>
          <Route>
            <Button
              variant="contained"
              className={classes.button}
              component={RouterLink}
              to={{
                pathname: "/connection/signup",
                state: { connectionType: "signup" }
              }}
            >
              Sign up as a volunteer
            </Button>
            <Button variant="contained" className={classes.button}
            component={RouterLink}
            to={{
              pathname: "/request",
              state: { isNewRequest: true }

            }}
            >
              Ask for Help
            </Button>
          </Route>
        </div>
      </div>
      <img src={landingPageImg} className={classes.landingPageImg} alt="landing-page" />
      </div>
    </div>

  );
}
