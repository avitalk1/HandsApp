import React, { useState } from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import CheckIcon from "@material-ui/icons/Check";
import { createMuiTheme } from "@material-ui/core";
import { ThemeProvider } from "@material-ui/styles";
import DateFnsUtils from "@date-io/date-fns";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Chip from "@material-ui/core/Chip";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker
} from "@material-ui/pickers";

const useStyles = makeStyles({
  title: {
    color: "#F4976C"
  },
  topInput: {
    width:"100%",
    "& .MuiFormControl-root": {
      margin: 0,
      color: "#F4976C"
    },
    "& label.Mui-focused": {
      color: "#F4976C"
    },
    "& .MuiInput-underline:after": {
      borderBottomColor: "#F4976C"
    },
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderRadius: "15px",
        boxShadow: "0px 5px 10px rgba(0, 0, 0, 0.25)"
      },
      "&:hover fieldset": {
        borderColor: "#F4976C"
      },
      "&.Mui-focused fieldset": {
        borderColor: "#F4976C"
      }
    }
  },
  thirdLine: {
    display: "flex",
    justifyContent: "space-between"
  },
  postBtn: {
    border: "none",
    color: "#F4976C",
    fontSize: "30px",
    position: "absolute",
    right: 0
  },
  selecter: {
    backgroundColor: "none"
  },
  chips: {
    display: "flex",
    flexWrap: "wrap"
  },
  chip: {
    margin: 2,
    backgroundColor: "#F2D7BE",
    color: "#F4976C"
  },
  inputConteiner: {
    width: "45%"
  },

  Input: {
    "& .MuiFormControl-root": {
      width: "100%",
      margin: 0,
      color: "#F4976C"
    },
    "& label.Mui-focused": {
      color: "#F4976C"
    },
    "& .MuiInput-underline:after": {
      borderBottomColor: "#F4976C"
    },
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderRadius: "15px",
        boxShadow: "0px 5px 10px rgba(0, 0, 0, 0.25)"
      },
      "&:hover fieldset": {
        borderColor: "#F4976C"
      },
      "&.Mui-focused fieldset": {
        borderColor: "#F4976C"
      }
    }
  }
});
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250
    }
  }
};
const professions = [
  "Plumber",
  "Electrician",
  "Painter",
  "Carpenter",
  "Contractor"
];

function getStyles(name, personName, theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium
  };
}

export default function CreatePost() {
  const classes = useStyles();
  const [selectedDate, setSelectedDate] = useState(new Date());
  const materialTheme = createMuiTheme({
    overrides: {
      MuiPickersDay: {
        daySelected: {
          backgroundColor: "#F4976C"
        }
      }
    }
  });
  const handleDateChange = date => {
    setSelectedDate(date);
  };
  const theme = useTheme();
  const [personName, setPersonName] = React.useState([]);

  const handleChange = event => {
    setPersonName(event.target.value);
  };

  return (
    <div>
      <form>
        <div>
          <TextField
            className={classes.topInput}
            id="outlined-search"
            placeholder="Request subject"
            type="search"
            variant="outlined"
          />
        </div>
        <div>
          <p className={classes.title}>Description</p>
          <TextField
            className={classes.topInput}
            id="outlined-search"
            placeholder="Request subject"
            type="search"
            variant="outlined"
          />
        </div>
        <div className={classes.thirdLine}>
          <div className={classes.inputConteiner}>
            <p className={classes.title}>Date</p>
            <div className={classes.Input}>
              <ThemeProvider theme={materialTheme}>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                  <KeyboardDatePicker
                    style={{ width: "100%" }}
                    inputVariant="outlined"
                    disableToolbar
                    variant="inline"
                    format="MM/dd/yyyy"
                    margin="normal"
                    id="date-picker-inline"
                    value={selectedDate}
                    onChange={handleDateChange}
                    KeyboardButtonProps={{
                      "aria-label": "change date"
                    }}
                  />
                </MuiPickersUtilsProvider>
              </ThemeProvider>
            </div>
          </div>
          <div className={classes.inputConteiner}>
            <p className={classes.title}>Professionals Needed</p>
            <div className={classes.Input}>
              <FormControl variant="outlined" className={classes.formControl}>
                <Select
                  className={classes.selecter}
                  labelId="demo-mutiple-chip-label"
                  id="demo-mutiple-chip"
                  multiple
                  value={personName}
                  onChange={handleChange}
                  renderValue={selected => (
                    <div className={classes.chips}>
                      {selected.map(value => (
                        <Chip
                          key={value}
                          label={value}
                          className={classes.chip}
                        />
                      ))}
                    </div>
                  )}
                  MenuProps={MenuProps}
                >
                  {professions.map(name => (
                    <MenuItem
                      key={name}
                      value={name}
                      style={getStyles(name, personName, theme)}
                    >
                      {name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </div>
          </div>
        </div>
        <div className={classes.volunteers}>
          <p className={classes.title}>Number Of Volunteers</p>
          <TextField
            className={classes.Input}
            id="outlined-search"
            type="number"
            variant="outlined"
          />
        </div>
        <button className={classes.postBtn}>
          <CheckIcon />
          Post
        </button>
      </form>
    </div>
  );
}
