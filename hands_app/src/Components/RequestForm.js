import "date-fns";
import React, { useState } from "react";
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
    marginBottom: "2.5%"
  },
  lineInput: {
    minWidth: "90%",
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "5%"
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
    // height:"20vh",
    boxShadow: "0px 5px 10px rgba(0, 0, 0, 0.25)",
    borderRadius: "15px",
    marginBottom: "5%"
  },
  imageContainer: {
    width: "100%",
    height: "20vh",
    backgroundColor: "white",
    borderRadius: "15px",
    boxShadow: "0px 5px 10px rgba(0, 0, 0, 0.25)",
    display: "flex",
    justifyContent: "space-evenly"
  },
  image: {
    width: "21%",
    height: "70%",
    marginTop: "1.5%",
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
    top: "35%",
    left: "40%"
  },
  submitBtn: {
    marginTop: "9%",
    marginLeft: "18%",
    width: "65%",
    height: "15vh",
    background: "#F4976C",
    color: "white",
    boxShadow: "0px 5px 10px rgba(0, 0, 0, 0.25)",
    fontSize: "2em",
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
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [validEmail, setValidEmail] = useState("");
  const [address, setAddress] = useState("");
  const [description, setDescription] = useState("");
  const [fileInput, setFileInput] = useState("");
  const [initial, setInitial] = useState(true);
  const [success, setRequestSuccess] = useState(false);
  const [previewImg, setPreviewImg] = useState(["", "", "", ""]);
  const [files, setFiles] = useState([]);
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

  const onFileLoad = e => {
    const file = e.target.files[0] || e.dataTransfer.files[0];
    let index = e.target.getAttribute("imgindex");
    let newPreviewImg = previewImg;
    newPreviewImg[index] = URL.createObjectURL(file);
    setPreviewImg(newPreviewImg);
    let newInlineStyles = inlineStyles;

    newInlineStyles[index] = {
      img: { display: "block" },
      icon: { display: "none" }
    };

    setInlineStyles(newInlineStyles);

    let fileReader = new FileReader();
    fileReader.onload = () => {
      //console.log("image loaded:", fileReader.result);

      setFiles(...files, fileReader.result);
    };
    fileReader.onabort = () => {
      alert("reading aborted");
    };
    fileReader.onError = () => {
      alert("error");
    };

    fileReader.readAsDataURL(file);
  };

  return (
    <form className={classes.formContainer}>
      <div className={classes.contactInfo}>
        <div className={classes.title}> Contact Information</div>
        <div className={classes.lineInput}>
          <TextField
            className={classes.Input}
            id="outlined-helperText"
            label="First Name"
            variant="outlined"
            value={firstName}
            onChange={e => setFirstName(e.target.value)}
            error={!firstName && !initial}
            helperText={!firstName && !initial ? "first name required" : ""}
          />
          <TextField
            className={classes.Input}
            id="outlined-helperText"
            label="Last Name"
            variant="outlined"
            value={lastName}
            onChange={e => setLastName(e.target.value)}
            error={!lastName && !initial}
            helperText={!lastName && !initial ? "last name required" : ""}
          />
        </div>
        <div className={classes.lineInput}>
          <TextField
            className={classes.Input}
            id="outlined-helperText"
            label="Email"
            variant="outlined"
            value={email}
            onChange={e => setEmail(e.target.value)}
            error={validEmail && !initial}
            helperText={validEmail}
          />
          <TextField
            className={classes.Input}
            id="outlined-helperText"
            type="phoneNumber"
            label="Phone Number"
            variant="outlined"
            value={phoneNumber}
            error={phoneNumber.length < 8 && !initial}
            helperText={
              phoneNumber.length < 8 && !initial
                ? "phone number required.."
                : ""
            }
            onChange={e => setPhoneNumber(e.target.value)}
          />
        </div>
      </div>

      <div className={classes.requestInfo}>
        <div className={classes.title}> Request Information</div>
        <div className={classes.lineInput}>
          <PlacesAutocomplete value={address} onChange={setAddress}>
            {({
              getInputProps,
              suggestions,
              getSuggestionItemProps,
              loading
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
            value={description}
            onChange={e => setDescription(e.target.value)}
            error={!description && !initial}
            helperText={!description && !initial ? "Description required" : ""}
          />
        </div>
      </div>
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
              // onClick={() => fileInput.click()}
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
              // onClick={() => fileInput.click()}
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
              // onClick={() => fileInput.click()}
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
      <Button className={classes.submitBtn} variant="contained">
        Submit
      </Button>
    </form>
  );
}
