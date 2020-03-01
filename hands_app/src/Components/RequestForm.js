import "date-fns";
import React, { useState, useEffect } from "react";
import { Button, TextField, Typography, createMuiTheme,Container, Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import AddIcon from "@material-ui/icons/Add";
import { ThemeProvider } from "@material-ui/styles";
import Autocomplete from '@material-ui/lab/Autocomplete';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import parse from 'autosuggest-highlight/parse';
import throttle from 'lodash/throttle';
import CostumeSnackbar from "../Components/CostumSnackbar"
import { Redirect } from "react-router";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import axios from "axios";
const materialTheme = createMuiTheme({
  overrides: {
    MuiPickersDay: {
      daySelected: {
        backgroundColor: "#F4976C"
      }
    }
  }
});
const useStyles = makeStyles({
  inputField:{
   marginTop: "10px",
   marginBottom: "10px",
    width:"45%",
    boxShadow: "0px 5px 10px rgba(0, 0, 0, 0.25)",
    borderRadius: "15px",
    '& label.Mui-focused': {
      color: '#F4976C',

    },
    '& .MuiInput-underline:after': {
      borderBottomColor: '#F4976C',

    },
    
    '& .MuiOutlinedInput-root': {
      borderRadius: "15px",
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
  title: {
    color: "#2C3531",
    fontSize: "1.5em",
    marginBottom: "1%",
    marginTop: "1%"
  },
  imageContainer: {
    width: "100%",
    backgroundColor: "white",
    borderRadius: "15px",
    boxShadow: "0px 5px 10px rgba(0, 0, 0, 0.25)",
    display: "flex",
    justifyContent: "space-evenly"
  },
  image: {
    width: "100px",
    height: "70px",
    marginTop: "1.5%",
    marginBottom: "1.5%",
    borderRadius: "15px",
    borderStyle: "dotted",
    borderColor: "#C4C4C4",
    display: "flex",
    position: "relative"
  },
  plus: {
    fontSize: "2em",
    color: "#C4C4C4",
    position: "absolute",
    top: "30%",
    left: "35%"
  },
  submitBtn: {
    marginTop: "2%",
    marginLeft: "18%",
    width: "65%",
    background: "#F4976C",
    color: "white",
    boxShadow: "0px 5px 10px rgba(0, 0, 0, 0.25)",
    fontSize: "1.5em",
    borderRadius: "15px"
  },
  draggable: {
    width: "60%"
  },
  imagePreview: {
    width: "100%",
    borderRadius: "15px"
  },
  fileInput: {
    color: "transparent",
    width: "100%",
    "&::-webkit-file-upload-button": {
      visibility: "hidden"
    },
    "&::before": {
      display: "block",
      color: "black",
      background: "none"
    }
  },
  dateInput: {
    marginTop: "10px",
    marginBottom: "10px",
    width: "45%",
    color: "black",
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
const autocompleteService = { current: null };

export default function RequestForm() {
  const classes = useStyles();
  const [newRequest, setNewRequest] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone_number: "",
    subject: "",
    date_from: new Date(),
    date_to: new Date(),
    location: "",
    images: [],
  });


 
  const [address, setAddress] = useState("");
  const [options, setOptions] = useState([])
  const [success, setRequestSuccess] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false)
  const [previewImg, setPreviewImg] = useState(0);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [inlineStyles, setInlineStyles] = useState([
    {
      img: { display: "none" },
      icon: { display: "block" }
    },
    {
      img: { display: "none" },
      icon: { display: "block" }
    },
    {
      img: { display: "none" },
      icon: { display: "block" }
    },
    {
      img: { display: "none" },
      icon: { display: "block" }
    }
  ]);

  const handleDateChange = date => {
    setSelectedDate(date);
  };
  const handleOnChange = (e) => {
    let tempNewRequest = newRequest;
    tempNewRequest[e.target.name] = e.target.value;
    setNewRequest(tempNewRequest);
  }
  const handleAddressChange = event => {
    setAddress(event.target.value);
  };
  const fetching = React.useMemo(
    () =>
      throttle((input, callback) => {
        autocompleteService.current.getPlacePredictions(input, callback);
      }, 200),
    [],
  );

  useEffect(() => {
    let active = true;

    if (!autocompleteService.current && window.google) {
      autocompleteService.current = new window.google.maps.places.AutocompleteService();
    }
    if (!autocompleteService.current) {
      return undefined;
    }
    if (address === '') {
      setOptions([]);
      return undefined;
    }

    fetching({ input: address }, results => {
      if (active) {
        setOptions(results || []);
      }
    });

    return () => {
      active = false;
    };
  }, [address, fetching]);

  const postData = async () => {
    try {
      const result = await axios.post("https://hands-app.herokuapp.com/request/addRequest", newRequest);
      if(result.data.message) setOpenSnackbar(true);
      else setRequestSuccess(true)
    } catch (err) {
      setOpenSnackbar(true);
    }
  }
  const uploadImagesToS3 = async (results, file) => {
    var formdata = new FormData();
    formdata.append("path", results);
    formdata.append("upload", file, file.name);

    var requestOptions = {
      method: 'POST',
      body: formdata,
      redirect: 'follow'
    };

    fetch("https://hands-app.herokuapp.com/request/uploadAWS", requestOptions)
      .then(response => response.text())
      .then(result => {
        let tempNewRequest = newRequest;
        tempNewRequest["images"].push(result);
        setNewRequest(tempNewRequest);
        let newInlineStyles = inlineStyles;
        newInlineStyles[newRequest.images.length - 1] = {
          img: { display: "block" },
          icon: { display: "none" }
        };
        setInlineStyles(newInlineStyles)
        setPreviewImg(previewImg + 1);
      })
      .catch(error => console.log('error', error));
  }
  const getImagesUrl = async (file) => {
    try {
      const result = await axios.post("https://hands-app.herokuapp.com/request/creatAWSUrl", { fileName: file.name, fileType: file.type })
      uploadImagesToS3(result.data, file)
    } catch (err) {
      console.log(err)
    }
  }
  const handleOnSubmit = () => {
    let tempNewRequest = newRequest;
    tempNewRequest["location"] = address;
    tempNewRequest["date_from"]= selectedDate;
    tempNewRequest["date_to"] = selectedDate;
    if(tempNewRequest.description) tempNewRequest["subject"] = tempNewRequest.description.substring(0, 15);
    setNewRequest(tempNewRequest)
    postData();
  }
  useEffect(() => {
  }, [previewImg])
  const onFileLoad = e => {
    if (!e.dataTransfer) {
      const file = e.target.files[0] || e.dataTransfer.files[0];
      getImagesUrl(file)
    }
  };
if(success){
  return (<Redirect
        to={{
          pathname: "/",
        }}
      />
  )

}else{
  return (
    <Container maxWidth="sm">
          <div className={classes.title}> Contact Information</div>
          <Grid container justify="space-between" style={{ width: "100%" }}>
            <TextField
              className={classes.inputField}
              label="First Name"
              variant="outlined"
              name="first_name"
              onChange={handleOnChange}
            />
            <TextField
              className={classes.inputField}
              label="Last Name"
              variant="outlined"
              name="last_name"
              onChange={handleOnChange}
            />
          </Grid>
          <Grid container justify="space-between" style={{ width: "100%" }}>
            <TextField
              className={classes.inputField}
              label="Email"
              variant="outlined"
              name="email"
              onChange={handleOnChange}
            />
            <TextField
              className={classes.inputField}
              type="phoneNumber"
              label="Phone Number"
              variant="outlined"
              name="phone_number"
              onChange={handleOnChange}
            />
          </Grid>
          <div className={classes.title}> Request Information</div>
          <Grid container justify="space-between" style={{ width: "100%" }}>
            <Autocomplete
               className={classes.inputField}
              getOptionLabel={option => {
                setAddress(option.description);
                return (typeof option === 'string' ? option : option.description)}
              }
              options={options}
              autoComplete
              includeInputInList
              disableOpenOnFocus
              onChange={handleAddressChange}
              renderInput={params => (
                <TextField
                  {...params}
                  label="Add a location"
                  variant="outlined"
                  fullWidth
                  onChange={handleAddressChange}
                />
              )}
              renderOption={option => {
                const matches = option.structured_formatting.main_text_matched_substrings;
                const parts = parse(
                  option.structured_formatting.main_text,
                  matches.map(match => [match.offset, match.offset + match.length]),
                );

                return (
                  <Grid container alignItems="center">
                    <Grid item>
                      <LocationOnIcon className={classes.icon} />
                    </Grid>
                    <Grid item xs>
                      {parts.map((part, index) => (
                        <span key={index} style={{ fontWeight: part.highlight ? 700 : 400 }}>
                          {part.text}
                        </span>
                      ))}
                      <Typography variant="body2" color="textSecondary">
                        {option.structured_formatting.secondary_text}
                      </Typography>
                    </Grid>
                  </Grid>
                );
              }}
            />

            <div className={classes.dateInput}>
              <ThemeProvider theme={materialTheme}>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                  <KeyboardDatePicker
                    inputVariant="outlined"
                    disableToolbar
                    variant="inline"
                    format="MM/dd/yyyy"
                    margin="normal"
                    id="date-picker-inline"
                    label="Dates"
                    value={selectedDate}
                    onChange={handleDateChange}
                    KeyboardButtonProps={{
                      "aria-label": "change date"
                    }}
                  />
                </MuiPickersUtilsProvider>
              </ThemeProvider>
            </div>
          </Grid>
            <TextField
              className={classes.inputField}
              style={{width:"100%"}}
              label="Description"
              variant="outlined"
              name="description"
              onChange={handleOnChange}
            />
        <div className={classes.images}>
          <div className={classes.title}> Images</div>
          <div className={classes.imageContainer}>
            <div className={classes.image}>
              <img
                className={classes.imagePreview}
                src={newRequest.images[0]}
                style={inlineStyles[0].img}
                alt="request-img"
              />
              <input
                className={classes.fileInput}
                imgIndex={0}
                type="file"
                name="file-browser-input"
                onDragOver={e => {
                  e.preventDefault();
                  e.stopPropagation();
                }}
                onDrop={onFileLoad}
                onChange={onFileLoad}
              />
              <div className={classes.filesBrowser}>
                <AddIcon style={inlineStyles[0].icon} className={classes.plus} />
              </div>
            </div>
            <div className={classes.image}>
              <img
                className={classes.imagePreview}
                src={newRequest.images[1]}
                style={inlineStyles[1].img}
                alt="request-img"
              />
              <input
                className={classes.fileInput}
                imgIndex={1}
                type="file"
                name="file-browser-input"
                onDragOver={e => {
                  e.preventDefault();
                  e.stopPropagation();
                }}
                onDrop={onFileLoad}
                onChange={onFileLoad}
              />
              <div className={classes.filesBrowser}>
                <AddIcon style={inlineStyles[1].icon} className={classes.plus} />
              </div>
            </div>
            <div className={classes.image}>
              <img
                className={classes.imagePreview}
                src={newRequest.images[2]}
                style={inlineStyles[2].img}
                alt="request-img"
              />
              <input
                className={classes.fileInput}
                imgIndex={2}
                type="file"
                name="file-browser-input"
                onDragOver={e => {
                  e.preventDefault();
                  e.stopPropagation();
                }}
                onDrop={onFileLoad}
                onChange={onFileLoad}
              />
              <div className={classes.filesBrowser}>
                <AddIcon style={inlineStyles[2].icon} className={classes.plus} />
              </div>
            </div>
            <div className={classes.image}>
              <img
                className={classes.imagePreview}
                src={newRequest.images[3]}
                style={inlineStyles[3].img}
                alt="request-img"
              />
              <input
                className={classes.fileInput}
                imgIndex={3}
                type="file"
                name="file-browser-input"
                onDragOver={e => {
                  e.preventDefault();
                  e.stopPropagation();
                }}
                onDrop={onFileLoad}
                onChange={onFileLoad}
              />
              <div className={classes.filesBrowser}>
                <AddIcon style={inlineStyles[3].icon} className={classes.plus} />
              </div>
            </div>
          </div>
        </div>
    
        <Button onClick={handleOnSubmit} className={classes.submitBtn} variant="contained" >
          Submit
      </Button>
      <CostumeSnackbar severity={"error"} messageInfo={"Opps Something Went Wrong, Make sure all fields are filled"} openSnackbar={openSnackbar} handleSnackbar={()=>setOpenSnackbar(false)}/>
    </Container>
  );
}
  
}
