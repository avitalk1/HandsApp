import React, { useState, useEffect } from "react";
import PlacesAutocomplete from "react-places-autocomplete";
import axios from "axios";
import {
  Button,
  TextField,
  Select,
  FormControl,
  InputLabel
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
const useStyles = makeStyles({
  formContainer: {
   
    maxWidth: "80%",
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
        borderRadius:"15px"
      },
      '&:hover fieldset': {
        borderColor: '#F4976C',
        
      },
      '&.Mui-focused fieldset': {
        borderColor: '#F4976C',
       
      },
    },
  },
  input: {
    minWidth: "100%",
    boxShadow: "0px 5px 10px rgba(0, 0, 0, 0.25)",
    borderRadius:"15px",
   
  },
  smallInput : {
    
    width: "45%",
    boxShadow: "0px 5px 10px rgba(0, 0, 0, 0.25)",
    borderRadius:"15px"
  },
  nameInput:{
    paddingTop:"45px",
    minWidth: "90%",
    display:"flex",
    justifyContent:"space-between"
  },
  signupBtn : {
    background:"#F4976C",
    color:"white",
    boxShadow: "0px 5px 10px rgba(0, 0, 0, 0.25)",
    fontSize:"36px",
    marginTop:"50px",
    marginBottom:"50px",
    borderRadius:"15px",
  },
  inputContainer:{
    paddingTop:"45px",
  }
  
});
const professions = ["None", "Plumber", "Painter", "Electrition"];

const Signup = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [validEmail, setValidEmail] = useState("");
  const [password, setPassword] = useState("");
  const [address, setAddress] = useState("");
  const [profession, setProfession] = useState("");
  const [initial, setInitial] = useState(true);
  const [signupSuccess, setSignupSuccess] = useState(false);
  const fetchPost = async () => {
    const user = {
      first_name: firstName,
      last_name: lastName,
      email: email,
      password: password,
      location: address,
      profession: (profession) ? profession : "None"
    }
    try {
      const response = await axios.post(
        "https://hands-app.herokuapp.com/user/signup",
        user
      );
     if(response.data.message){
       setValidEmail(response.data.message);
     }else{
       setSignupSuccess(true);
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
      setValidEmail("Invalid Email!");
      flag = false;
    }
   
    if (!firstName || !lastName || password.length < 8 || !address) {
      flag = false;
    }
    if (flag) {
      fetchPost();
    }
  };
  const classes = useStyles();
  return (
    <form className={classes.formContainer}>
      <div className={classes.nameInput}>
        <TextField
         className={classes.smallInput}
          id="outlined-helperText"
          label="First Name"
          variant="outlined"
          value={firstName}
          onChange={e => setFirstName(e.target.value)}
          error={!firstName && !initial}
          helperText={!firstName && !initial ? "first name required" : ""}
        />
        <TextField
          className={classes.smallInput}
          id="outlined-helperText"
          label="Last Name"
          variant="outlined"
          value={lastName}
          onChange={e => setLastName(e.target.value)}
          error={!lastName && !initial}
          helperText={!lastName && !initial ? "last name required" : ""}
        />
      </div>
      <div className={classes.inputContainer}>
        <TextField
          className={classes.input}
          id="outlined-helperText"
          label="Email"
          variant="outlined"
          value={email}
          onChange={e => setEmail(e.target.value)}
          error={validEmail && !initial}
          helperText={validEmail}
        />
      </div>
      <div className={classes.inputContainer}>
        <TextField
          className={classes.input}
          id="outlined-helperText"
          type="password"
          label="Password"
          variant="outlined"
          value={password}
          error={password.length < 8 && !initial}
          helperText={
            password.length < 8 && !initial ? "invalid password!" : ""
          }
          onChange={e => setPassword(e.target.value)}
        />
      </div>
      <div className={classes.inputContainer}>
        <PlacesAutocomplete
          value={address}
          onChange={setAddress}
        >
          {({
            getInputProps,
            suggestions,
            getSuggestionItemProps,
            loading
          }) => (
            <div>
              <TextField
                className={classes.input}
                id="outlined-helperText"
                label="Location"
                variant="outlined"
                error={!address && !initial}
                helperText={!address && !initial ? "location required" : ""}
                {...getInputProps()}
              />
              <div>
                {suggestions.map(suggestion => {
                  return (
                    <div {...getSuggestionItemProps(suggestion)}>
                      {suggestion.description}
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </PlacesAutocomplete>
      </div>
      <div className={classes.inputContainer}>
        <FormControl variant="outlined" className={classes.input}>
          <InputLabel> Profession </InputLabel>
          <Select
            native
            labelWidth={80}
            value={profession}
            onChange={e => setProfession(e.target.value)}
            inputProps={{
              name: "profession"
            }}
          >
            <option value="" />
            {professions.map(pro => (
              <option key={pro} value={pro}>
                {pro}
              </option>
            ))}
          </Select>
        </FormControl>
      </div>
      <Button className={classes.signupBtn} onClick={handleSubmit} variant="contained">
        SIGN UP
      </Button>
    </form>
  );
};

export default Signup;
