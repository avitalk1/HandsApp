import "date-fns";
import React, { useState, useEffect } from "react";
import { Button, TextField } from "@material-ui/core";
import PlacesAutocomplete from "react-places-autocomplete";
import { makeStyles } from "@material-ui/core/styles";
import AddIcon from "@material-ui/icons/Add";
import { createMuiTheme } from "@material-ui/core";
import { ThemeProvider } from "@material-ui/styles";
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
  formContainer: {
    maxWidth: "80%",
    minHeight: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-evenly",
    "& label.Mui-focused": {
      color: "#F4976C"
    },
    "& .MuiInput-underline:after": {
      borderBottomColor: "#F4976C"
    },
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderRadius: "15px"
      },
      "&:hover fieldset": {
        borderColor: "#F4976C"
      },
      "&.Mui-focused fieldset": {
        borderColor: "#F4976C"
      }
    }
  },
  title: {
    color: "#2C3531",
    fontSize: "1.5em",
    marginBottom: "2%"
  },
  lineInput: {
    minWidth: "90%",
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "3%"
  },
  Input: {
    width: "45%",
    boxShadow: "0px 5px 10px rgba(0, 0, 0, 0.25)",
    borderRadius: "15px"
  },
  inputContainer: {
    marginggTop: "6%"
  },
  description: {
    width: "100%",
    boxShadow: "0px 5px 10px rgba(0, 0, 0, 0.25)",
    borderRadius: "15px",
    marginBottom: "3%"
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
    width: "45%",
    color:"black",
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
  locationInput: {
    width: "100%"
  },
  locationInputContainer: {
    width: "45%"
  }
});

export default function RequestForm() {
  const classes = useStyles();
  const [newRequest, setNewRequest] = useState({
      first_name: "",
      last_name: "",
      email:"",
      phone_number:"",
      subject:"",
      date_from: new Date(),
      date_to: new Date(),
      location:"",
      images:[] ,
  });

  const [validEmail, setValidEmail] = useState("");
  const [address, setAddress] = useState("");
  const [fileInput, setFileInput] = useState("");
  const [initial, setInitial] = useState(true);
  const [success, setRequestSuccess] = useState(false);
  const [previewImg, setPreviewImg] = useState([]);
  const [files, setFiles] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [uploadHandleState, setUploadHandleState] = useState(true);
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
  const postData = async () => {
    let formData = new FormData();
    for (const key of Object.keys(newRequest)) {
      if(key != "images")
          formData.append(`${key}`, newRequest[key]);
    }
    for(const key of Object.keys(newRequest.images)){
      console.log(newRequest.images[key])
        formData.append('images',newRequest.images[key] )
    }
    try{
        const result = await axios.post("https://hands-app.herokuapp.com/request/addRequest", formData);
        console.log(result);
    }catch(err){
      console.log(err);
    }
  }
  const handleOnSubmit = () => {
    let tempNewRequest = newRequest;
    tempNewRequest["location"] = address;
    tempNewRequest["date_from"]= selectedDate;
    tempNewRequest["date_to"] = selectedDate;
    tempNewRequest["subject"] = tempNewRequest.description.substring(0, 15);
    setNewRequest(tempNewRequest)
    postData();
  }
  useEffect(() => {
  }, [previewImg])
  const onFileLoad = e => {
    console.log("1")
    if(!e.dataTransfer){
      const file = e.target.files[0] || e.dataTransfer.files[0];
      let tempNewRequest = newRequest;
      tempNewRequest["images"].push(file);
      setNewRequest(tempNewRequest)
      let index = e.target.getAttribute("imgindex");
      
      let newPreviewImg = previewImg;
      newPreviewImg.push(URL.createObjectURL(file))
      setPreviewImg(newPreviewImg);

      let newInlineStyles = inlineStyles;
      newInlineStyles[previewImg.length-1] = {
        img: { display: "block" },
        icon: { display: "none" }
      };
      setInlineStyles(newInlineStyles);

      let fileReader = new FileReader();
      fileReader.onload = () => {
        setFiles(fileReader.result);
      };
      fileReader.onabort = () => {
        alert("reading aborted");
      };
      fileReader.onError = () => {
        alert("error");
      };
  
      fileReader.readAsDataURL(file);
    }
  
  };

  return (
    <form className={classes.formContainer}>
      <div>
      <div className={classes.contactInfo}>
        <div className={classes.title}> Contact Information</div>
        <div className={classes.lineInput}>
          <TextField
            className={classes.Input}
            id="outlined-helperText"
            label="First Name"
            variant="outlined"
            name="first_name"
            onChange={handleOnChange}
            error={!newRequest.first_name && !initial}
            helperText={!newRequest.first_name && !initial ? "first name required" : ""}
          />
          <TextField
            className={classes.Input}
            id="outlined-helperText"
            label="Last Name"
            variant="outlined"
            name="last_name"
            onChange={handleOnChange}
            error={!newRequest.last_name && !initial}
            helperText={!newRequest.last_name && !initial ? "last name required" : ""}
          />
        </div>
        <div className={classes.lineInput}>
          <TextField
            className={classes.Input}
            id="outlined-helperText"
            label="Email"
            variant="outlined"
            name="email"
            onChange={handleOnChange}
            error={validEmail && !initial}
            helperText={validEmail}
          />
          <TextField
            className={classes.Input}
            id="outlined-helperText"
            type="phoneNumber"
            label="Phone Number"
            variant="outlined"
            name="phone_number"
            onChange={handleOnChange}
            error={newRequest.phone_number.length < 8 && !initial}
            helperText={
              newRequest.phone_number.length < 8 && !initial
                ? "phone number required.."
                : ""
            }
          />
        </div>
      </div>
      </div>
          <div>
      <div className={classes.requestInfo}>
        <div className={classes.title}> Request Information</div>
        <div className={classes.lineInput}>
          <PlacesAutocomplete value={address} onChange={setAddress}>
            {({
              getInputProps,
              suggestions,
              getSuggestionItemProps,
            }) => (
              <div className={classes.locationInputContainer}>
                <TextField
                  className={classes.locationInput}
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
        </div>

        <div className={classes.inputContainer}>
          <TextField
            className={classes.description}
            id="outlined-helperText"
            label="Description"
            variant="outlined"
            name="description"
            onChange={handleOnChange}
            error={!newRequest.description && !initial}
            helperText={!newRequest.description && !initial ? "Description required" : ""}
          />
        </div>
      </div>
      </div>
      <div>
      <div className={classes.images}>
        <div className={classes.title}> Images</div>
        <div className={classes.imageContainer}>
          <div className={classes.image}>
            <img
              className={classes.imagePreview}
              src={previewImg[0]}
              style={inlineStyles[0].img}
            />
            <input
              className={classes.fileInput}
              imgIndex={0}
              type="file"
              id="file-browser-input"
              name="file-browser-input"
              ref={input => setFileInput(input)}
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
              src={previewImg[1]}
              style={inlineStyles[1].img}
            />
            <input
              className={classes.fileInput}
              imgIndex={1}
              type="file"
              id="file-browser-input"
              name="file-browser-input"
              ref={input => setFileInput(input)}
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
              src={previewImg[2]}
              style={inlineStyles[2].img}
            />
            <input
               className={classes.fileInput}
               imgIndex={2}
               type="file"
               id="file-browser-input"
               name="file-browser-input"
               ref={input => setFileInput(input)}
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
              src={previewImg[3]}
              style={inlineStyles[3].img}
            />
            <input
              className={classes.fileInput}
              imgIndex={3}
              type="file"
              id="file-browser-input"
              name="file-browser-input"
              ref={input => setFileInput(input)}
              onDragOver={e => {
                e.preventDefault();
                e.stopPropagation();
              }}
              onDrop={onFileLoad}
              onChange={onFileLoad}
              //    onClick={() => fileInput.click()}
            />
            <div className={classes.filesBrowser}>
              <AddIcon style={inlineStyles[3].icon} className={classes.plus} />
            </div>
          </div>
        </div>
      </div>
      </div>
      <div>
      <Button className={classes.submitBtn} variant="contained" onClick={handleOnSubmit}>
        Submit
      </Button>
      </div>
    </form>
  );
}
