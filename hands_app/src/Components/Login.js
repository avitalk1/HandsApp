import React, { useState, useEffect } from "react";
import { Redirect } from "react-router";

import axios from "axios";
import {
  Button,
  TextField
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
const useStyles = makeStyles({
  formContainer: {
    width: "80%",
    minHeight: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-evenly",
    '& label.Mui-focused': {
      color: '#F4976C',

    },
    '& .MuiInput-underline:after': {
      borderBottomColor: '#F4976C',

    },
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderRadius: "15px"
      },
      '&:hover fieldset': {
        borderColor: '#F4976C',

      },
      '&.Mui-focused fieldset': {
        borderColor: '#F4976C',

      },
    },
  },

  errorMsg: {
    color: 'red'
  },
  input: {
    minWidth: "100%",
    boxShadow: "0px 5px 10px rgba(0, 0, 0, 0.25)",
    borderRadius: "15px",
    marginTop: "45px"
  },
  loginBtn: {
    background: "#F4976C",
    color: "white",
    boxShadow: "0px 5px 10px rgba(0, 0, 0, 0.25)",
    fontSize: "36px",
    marginTop: "50px",
    marginBottom: "50px",
    borderRadius: "15px",
  },
});

const Login = () => {
  let content;
  const [email, setEmail] = useState("");
  const [valid, setValid] = useState("");
  const [password, setPassword] = useState("");
  const [loginSuccess, setLoginSuccess] = useState(false);
  const [loggedInUser, setloggedInUser] = useState();
  const [initial, setInitial] = useState(true);

  const fetchPost = async () => {
    const user = {
      email: email,
      password: password,
    }
    try {
      const response = await axios.post(
        "https://hands-app.herokuapp.com/user/login",
        user
      );
      setloggedInUser(response.data);
      if (response.data.message) {
        setValid(`**${response.data.message}`);
      } else {
        setLoginSuccess(true);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleSubmit = () => {
    let flag = true;
    setInitial(false);
    if (
      !email ||
      email.lastIndexOf("@") === -1 ||
      email.lastIndexOf(".") === -1
    ) {
      setValid("**Invalid Email!");
      flag = false;
    }

    if (password.length < 8) {
      flag = false;
    }
    if (flag) {
      fetchPost();
    }
  };
  const classes = useStyles();
  if (loginSuccess === true) {
    console.log(loggedInUser)
    if (loggedInUser.user_type === "Volunteer") {
      content = (
        <Redirect
          to={{
            pathname: "/posts",
            state: { userId: loggedInUser._id }
          }}
        />
      );
    } else if (loggedInUser.user_type === "Admin") {
      content = (
      <Redirect
        to={{
          pathname: "/admin",
          state: { userId: loggedInUser._id },
          rerender:false
        }}
      />
      );
    } else {
      content = (
        <Redirect
          to={{
            pathname: "/request",
            state: { 
              isNewRequest:false,
              userId: loggedInUser._id 
            }
          }}
        />
        );
    }
  } else {
    content = (
      <form className={classes.formContainer}>
        <div>
          <TextField
            className={classes.input}
            id="outlined-helperText"
            label="Email"
            variant="outlined"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
        </div>
        <div>
          <TextField
            className={classes.input}
            id="outlined-helperText"
            type="password"
            label="Password"
            variant="outlined"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
        </div>
        <p className={classes.errorMsg}>{valid}</p>
        <Button className={classes.loginBtn} onClick={handleSubmit} variant="contained">
          LOGIN
      </Button>
      </form>
    )
  }
  return content;
};

export default Login;
