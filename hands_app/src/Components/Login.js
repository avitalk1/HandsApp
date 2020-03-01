import React, { useState} from "react";
import { Redirect } from "react-router";

import axios from "axios";
import {
  Container,
  Button,
  TextField
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
const useStyles = makeStyles({
  inputField:{
    marginTop: "45px",
    boxShadow: "0px 5px 10px rgba(0, 0, 0, 0.25)",
    borderRadius: "15px",
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
  loginBtn: {
    background: "#F4976C",
    boxShadow: "0px 5px 10px rgba(0, 0, 0, 0.25)",
    fontSize: "36px",
    marginBottom: "50px",
    marginTop: "25px",
    borderRadius: "15px",
    color:"white"
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
      <Container maxWidth="sm">
          <TextField
            className={classes.inputField}
            fullWidth
            margin="normal"
            label="Email"
            variant="outlined"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
          <TextField
            className={classes.inputField}
            fullWidth
            margin="normal"
            type="password"
            label="Password"
            variant="outlined"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />      
        <p className={classes.errorMsg}>{valid}</p>
        <Button className={classes.loginBtn} fullWidth onClick={handleSubmit} variant="contained">
          LOGIN
      </Button>
      </Container>
    )
  }
  return content;
};

export default Login;
