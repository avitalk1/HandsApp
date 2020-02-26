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
import { Redirect } from "react-router";
import axios from "axios";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker
} from "@material-ui/pickers";
import moment from "moment";

const useStyles = makeStyles({
  title: {
    color: "#F4976C",
    marginTop:"5%"
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
      background:"none",
    right: "5%"
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
  smallInputConteiner: {
    width: "45%",
    marginTop:"5%"
  },
  largeInputConteiner: {
    marginTop:"10%",
    "& .MuiFormControl-root": {
      width:"100%",
      margin: 0,
      color: "#F4976C"
    },
  },
  inputStyle:{
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
  descriptionInput:{
      width:"100%"
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
  const [post, setPost] = useState({
    admin:props.userId,
    request:request._id,
    number_of_volunteers:{
      need:0
    },
    costume_description:{
      changed:false,
      description:""
    },
    selected_dates:{
      from: new Date(),
      to:new Date()
    },
    professions:[],
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
  const handleOnClick = async () =>{
    let changedPost = post;
    professionsNeeded.map((pro) => {
      changedPost.professions.push({
        profession:pro,
        number_needed: Math.round(post.number_of_volunteers.need/professionsNeeded.length)
      })
    })
    changedPost.cover_photo = props.coverPhoto;
    setPost(changedPost);
    try{
      const result = await axios.post("https://hands-app.herokuapp.com/post/addPost", post);
      console.log(result)
      setPosted(true);
    }catch(err){
      console.log(err)
    }

  }
  const handleOnDateChange = (value) =>{
    let changedPost = post;
    changedPost["selected_dates"].from =`${moment(value).format("MM/DD/YYYY")}`;
    changedPost["selected_dates"].to = `${moment(value).format("MM/DD/YYYY")}`;
    setPost(changedPost);
  }
  const handleOnChange = (e) => {
    let changedPost = post;
    if(e.target.name === "number_of_volunteers"){
      changedPost[e.target.name].need = e.target.value
    } else if (  e.target.name === "costume_description"){
      changedPost[e.target.name].changed = true;
      changedPost[e.target.name].description = e.target.value;
    }
    setPost(changedPost);
  }
  if(!posted){
    return (
      <div style={{width:"80%"}}>
        <form>
          <div className={classes.largeInputConteiner}>
            <TextField
              className={classes.inputStyle}
              placeholder={request.subject}
              variant="outlined"
              InputProps={{
                readOnly: true,
              }}
            />
          </div>
          <div className={classes.largeInputConteiner}>
            <div className={classes.title}>Description</div>
            <TextField 
                multiline
                rows={4}
              className={`${classes.inputStyle} ${classes.descriptionInput}`}
              placeholder={request.description}
              variant="outlined"
              name="costume_description"
              onChange={handleOnChange}
            />
          </div>
          <div className={classes.thirdLine}>
            <div className={classes.smallInputConteiner}>
              <div className={classes.title}>Date</div>
              <div className={classes.inputStyle}>
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
                      value={post.selected_dates.from}
                      onChange={handleOnDateChange}
                      KeyboardButtonProps={{
                        "aria-label": "change date"
                      }}
                    />
                  </MuiPickersUtilsProvider>
                </ThemeProvider>
              </div>
            </div>
            <div className={classes.smallInputConteiner}>
              <div className={classes.title}>Professionals Needed</div>
              <div className={classes.inputStyle}>
                <FormControl variant="outlined" className={classes.formControl}>
                  <Select
                    className={classes.selecter}
                    labelId="demo-mutiple-chip-label"
                    id="demo-mutiple-chip"
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
              </div>
            </div>
          </div>
          <div className={classes.inputConteiner}>
            <div className={classes.title}>Number Of Volunteers</div>
            <TextField
              className={classes.inputStyle}
              id="outlined-search"
              type="number"
              variant="outlined"
              name="number_of_volunteers"
              onChange={handleOnChange}
            />
          </div>
        </form>
        <button  onClick={handleOnClick} className={classes.postBtn}>
            <CheckIcon />
            Post
          </button>
      </div>
    )
  }else{
      return (
        <Redirect
          to={{
            pathname: "/admin",
            state: {
              userId: props.userId,
              rerander:true
            }
          }}
        />
      )
  }
  

}
