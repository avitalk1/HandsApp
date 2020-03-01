import React, { useState } from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { Container, Box, Grid, Typography, createMuiTheme, TextField, MenuItem, FormControl, Select, Chip } from "@material-ui/core";
import { ThemeProvider } from "@material-ui/styles";
import CheckIcon from "@material-ui/icons/Check";
import DateFnsUtils from "@date-io/date-fns";
import { Redirect } from "react-router";
import axios from "axios";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker
} from "@material-ui/pickers";
import moment from "moment";
import CostumeSnackbar from "../CostumSnackbar";

const useStyles = makeStyles({
  title: {
    color: "#F4976C"
  },

  postBtn: {
    border: "none",
    color: "#F4976C",
    fontSize: "30px",
    position: "absolute",
    background: "none",
    right: "5%",
    bottom: "5%",
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
  inputStyle: {
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
  },
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
function getStyles(name, profession, theme) {
  return {
    fontWeight:
      profession.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium
  };
}

export default function CreatePostForm(props) {
  const theme = useTheme();
  const classes = useStyles();
  const [professionsNeeded, setProfessionsNeeded] = useState([]);
  const [request, setRequest] = useState(props.requestDetails);
  const [posted, setPosted] = useState(false)
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [post, setPost] = useState({
    admin: props.userId,
    request: request._id,
    number_of_volunteers: {
      need: 0
    },
    costume_description: {
      changed: false,
      description: ""
    },
    selected_dates: {
      from: new Date(),
      to: new Date()
    },
    professions: [],
    cover_photo: 0,
  })
  const materialTheme = createMuiTheme({
    overrides: {
      MuiPickersDay: {
        daySelected: {
          backgroundColor: "#F4976C"
        }
      }
    }
  });
  const handleProfessionsChange = event => {
    setProfessionsNeeded(event.target.value);

  };
  const handleOnClick = async () => {
    let changedPost = post;
    professionsNeeded.map((pro) => {
      changedPost.professions.push({
        profession: pro,
        number_needed: Math.round(post.number_of_volunteers.need / professionsNeeded.length)
      })
    })
    changedPost.cover_photo = props.coverPhoto;
    setPost(changedPost);
    if(post.professions.length === 0 || !post.number_of_volunteers.need === 0) setOpenSnackbar(true);
    else {
      try {
        await axios.post("https://hands-app.herokuapp.com/post/addPost", post);
        setPosted(true);
      } catch (err) {
        setOpenSnackbar(true);
        console.log(err)
      }
    }
   

  }
  const handleOnDateChange = (value) => {
    let changedPost = post;
    changedPost["selected_dates"].from = `${moment(value).format("MM/DD/YYYY")}`;
    changedPost["selected_dates"].to = `${moment(value).format("MM/DD/YYYY")}`;
    setPost(changedPost);
  }
  const handleOnChange = (e) => {
    let changedPost = post;
    if (e.target.name === "number_of_volunteers") {
      changedPost[e.target.name].need = e.target.value
    } else if (e.target.name === "costume_description") {
      changedPost[e.target.name].changed = true;
      changedPost[e.target.name].description = e.target.value;
    }
    setPost(changedPost);
  }
  if (!posted) {
    return (
      <Container maxWidth="sm">
        <Grid container direction="column" justify="space-between" style={{height:"90%"}}>
        <TextField
          className={classes.inputStyle}
          fullWidth
          margin="normal"
          placeholder={request.subject}
          variant="outlined"
          InputProps={{
            readOnly: true,
          }}
        />
        <Box>
        <Typography className={classes.title}>Description</Typography>
        <TextField
          multiline
          rows={4}
          className={classes.inputStyle}
          fullWidth
          margin="normal"
          placeholder={request.description}
          variant="outlined"
          name="costume_description"
          onChange={handleOnChange}
        />
        </Box>
        <Grid container justify="space-between">
          <Box>
            <Typography  className={classes.title}>Date</Typography>
            <ThemeProvider theme={materialTheme}>
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <KeyboardDatePicker
                  className={classes.inputStyle}
                  inputVariant="outlined"
                  disableToolbar
                  variant="inline"
                  format="MM/dd/yyyy"
                  margin="normal"
                  value={post.selected_dates.from}
                  onChange={handleOnDateChange}
                  KeyboardButtonProps={{
                    "aria-label": "change date"
                  }}
                />
              </MuiPickersUtilsProvider>
            </ThemeProvider>
          </Box>
          <Box style={{ width: "45%" }}>
            <Typography  className={classes.title} >Professionals Needed</Typography>
            <FormControl variant="outlined" margin="normal" style={{ width: "100%" }} className={classes.inputStyle}>
              <Select
                className={classes.selecter}
                multiple
                value={professionsNeeded}
                onChange={handleProfessionsChange}
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
                    style={getStyles(name, professionsNeeded, theme)}
                  >
                    {name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
        </Grid>
        <Box>
        <Typography  className={classes.title} >Number Of Volunteers</Typography>
        <TextField
          style={{ width: "45%" }}
          margin="normal"
          className={classes.inputStyle}
          type="number"
          variant="outlined"
          name="number_of_volunteers"
          onChange={handleOnChange}
        />
        </Box>

        <button className={classes.postBtn}onClick={handleOnClick}>
          <CheckIcon />
          Post
          </button>
        </Grid>
        <CostumeSnackbar severity={"error"} messageInfo={"Opps Something Went Wrong Please Try Agian"} openSnackbar={openSnackbar} handleSnackbar={()=>setOpenSnackbar(false)}/>
      </Container>
    )
  } else {
    return (
      <Redirect
        to={{
          pathname: "/admin",
          state: {
            userId: props.userId,
            rerander: true,
          }
        }}
      />
    )
  }


}
