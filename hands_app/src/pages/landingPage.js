import React from "react";
import "../index.css";
import { Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Route } from "react-router-dom";
import { Link as RouterLink } from "react-router-dom";
const useStyles = makeStyles({
  root: {
    minWidth: "100%",
    minHeight: "100vh",
    background: "linear-gradient(248.35deg,#b4dfe5 1.55%, #07889b 95.8%)"
  },
  container: {
    maxWidth: "50%",
    position: "relative",
    height: "40vh",
    top: 300,
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
    maxWidth: "70%"
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
  }
});

export default function LandingPage() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <div className={classes.container}>
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
              to="/signup"
            >
              Sign up as a volunteer
            </Button>
            <Button variant="contained" className={classes.button}>
              Ask for Help
            </Button>
          </Route>
        </div>
      </div>
    </div>
  );
}
