import React, { useState } from "react";
import PlacesAutocomplete from "react-places-autocomplete";
import axios from "axios";
import { Redirect } from "react-router";
import {
  Grid,
  Container,
  Button,
  TextField,
  Select,
  FormControl,
  InputLabel
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import LocationOnIcon from '@material-ui/icons/LocationOn';
const useStyles = makeStyles({
  inputField: {
    boxShadow: "0px 5px 10px rgba(0, 0, 0, 0.25)",
    borderRadius: "15px",
    marginTop: "35px",
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
  signupBtn: {
    background: "#F4976C",
    boxShadow: "0px 5px 10px rgba(0, 0, 0, 0.25)",
    fontSize: "24px",
    marginBottom: "25px",
    marginTop: "25px",
    borderRadius: "15px",
    color: "white"
  },

});
const professions = ["None", "Plumber", "Painter", "Electrition"];
// change to one state for the user credetials
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
  const [loggedInUser, setloggedInUser] = useState();

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
      if (response.data.message) {

        setValidEmail(response.data.message);
      } else {
        setloggedInUser(response.data);
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
  if (signupSuccess) {
    return (
      <Redirect
        to={{
          pathname: "/posts",
          state: { userId: loggedInUser._id }
        }}
      />
    )
  } else {
    return (
      <Container maxWidth="sm">
        <Grid container justify="space-between" style={{ width: "100%" }}>
          <TextField
            style={{ width: "45%" }}
            className={classes.inputField}
            label="First Name"
            variant="outlined"
            value={firstName}
            onChange={e => setFirstName(e.target.value)}
            error={!firstName && !initial}
            helperText={!firstName && !initial ? "first name required" : ""}
          />
          <TextField

            style={{ width: "45%" }}
            className={classes.inputField}
            label="Last Name"
            variant="outlined"
            value={lastName}
            onChange={e => setLastName(e.target.value)}
            error={!lastName && !initial}
            helperText={!lastName && !initial ? "last name required" : ""}
          />
        </Grid>

        <TextField
          className={classes.inputField}
          label="Email"

          fullWidth
          variant="outlined"
          value={email}
          onChange={e => setEmail(e.target.value)}
          error={validEmail && !initial}
          helperText={validEmail}
        />
        <TextField
          className={classes.inputField}
          type="password"
          label="Password"
          variant="outlined"
          fullWidth
          value={password}
          error={password.length < 8 && !initial}
          helperText={
            password.length < 8 && !initial ? "invalid password!" : ""
          }
          onChange={e => setPassword(e.target.value)}
        />
        <div >
          <PlacesAutocomplete
            value={address}
            onChange={setAddress}
          >
            {({
              getInputProps,
              suggestions,
              getSuggestionItemProps
            }) => (
                <div>
                  <TextField
                    fullWidth
                    className={classes.inputField}
                    label="Location"
                    variant="outlined"
                    error={!address && !initial}
                    helperText={!address && !initial ? "location required" : ""}
                    {...getInputProps()}
                  />
                  <div>
                    <Grid container alignItems="center">
                      {suggestions.map(suggestion => {
                        const style = { backgroundColor: suggestion.active ? "#F4976C" : "white", color: suggestion.active ? "white" : "black" }
                        return (
                          <div {...getSuggestionItemProps(suggestion, { style })}>
                            <Grid item>
                              <LocationOnIcon className={classes.icon} />
                              {suggestion.description}
                            </Grid>
                          </div>
                        );
                      })}
                    </Grid>
                  </div>
                </div>
              )}
          </PlacesAutocomplete>
        </div>
        <div>
          <FormControl variant="outlined" style={{ width: "100%" }} className={classes.inputField} margin="normal">
            <InputLabel> Profession </InputLabel>
            <Select
              className={classes.inputField}
              style={{ marginTop: "0px" }}
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
        <Button fullWidth className={classes.signupBtn} onClick={handleSubmit} variant="contained">
          SIGN UP
        </Button>
      </Container>
    );
  }

};

export default Signup;
