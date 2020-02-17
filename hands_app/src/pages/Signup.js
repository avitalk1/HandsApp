import React, { useState } from "react";
import PlacesAutocomplete from "react-places-autocomplete";
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
    maxWidth: "30%",
    minHeight: "40vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-evenly"
  },
  input: {
    minWidth: "100%"
  }
});
const professions = ["Other", "Plumber", "Painter", "Electrition"];
const Signup = () => {
  const [firstName,setFirstName]=useState("");
  const [lastName,setLastName]=useState("");
  const [email,setEmail]=useState("");
  const [password,setPassword]=useState("");
  const [address, setAddress] = useState("");
  const [profession,setProfession]=useState("");

  const handleSelect = async value => {
    console.log(value);
  };
  const classes = useStyles();
  return (
    <form className={classes.formContainer}>
      <div>
        <TextField
          id="outlined-helperText"
          label="First Name"
          variant="outlined"
          value={firstName}
          onChange={e=>setFirstName(e.target.value)}
        />
        <TextField
          id="outlined-helperText"
          label="Last Name"
          variant="outlined"
          value={lastName}
          onChange={e=>setLastName(e.target.value)}
        />
      </div>
      <div>
        <TextField
          className={classes.input}
          id="outlined-helperText"
          label="Email"
          variant="outlined"
          value={email}
          onChange={e=>setEmail(e.target.value)}
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
          onChange={e=>setPassword(e.target.value)}
        />
      </div>
      <div>
        <PlacesAutocomplete
          value={address}
          onChange={setAddress}
          onSelect={handleSelect}
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
      <div>
        <FormControl variant="outlined" className={classes.input}>
          <InputLabel> Profession </InputLabel>
          <Select
            native
            labelWidth={80}
            value={profession}
            onChange={e=>setProfession(e.target.value)}
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

      <Button variant="contained">SIGN UP</Button>
    </form>
  );
};

export default Signup;
