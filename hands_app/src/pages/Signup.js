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
  const [address, setAddress] = useState("");
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
        />
        <TextField
          id="outlined-helperText"
          label="Last Name"
          variant="outlined"
        />
      </div>
      <div>
        <TextField
          className={classes.input}
          id="outlined-helperText"
          label="Email"
          variant="outlined"
        />
      </div>
      <div>
        <TextField
          className={classes.input}
          id="outlined-helperText"
          type="password"
          label="Password"
          variant="outlined"
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
                  const chose = {
                    backgroundColor: suggestion.active ? "#41b6e6" : "fff"
                  };
                  return (
                    <div {...getSuggestionItemProps(suggestion, { chose })}>
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
