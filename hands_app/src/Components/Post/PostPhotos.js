import React, { useState } from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";

const useStyles = makeStyles({

  root:{
    height:"75%",
  },
  title:{
      marginLeft:"10%",
      fontSize:"16px"
  },
  imagesContainer: {
    height:"100%",
    marginLeft: "25%",
    display: "flex",
    flexDirection: "column",
    justifyContent:"space-around"

  },
  image: {
    backgroundColor: "#C4C4C4",
    width: "25%",
    height: "13vh",
    borderRadius: "5%"
  },
  selectPhoto: {
    boxShadow: "0px 15px 27px rgba(0, 0, 0, 0.5)"
  }
});

export default function PostPhotos() {
  const classes = useStyles();
  const [selectPhoto, setSelectPhoto] = useState(["", "", "", ""]);
  const handleSelect = index => {
    console.log("hello");
    let newSelectPhoto = ["", "", "", ""];
    newSelectPhoto[index] = "selectPhoto";
    setSelectPhoto(newSelectPhoto);
  };
  return (
    <div className={classes.root}>
      <div className={classes.title}>Choose a Cover Photo for the post:</div>
      <div className={classes.imagesContainer}>
        <div
          onClick={() => handleSelect(0)}
          className={`${classes.image} ${classes[selectPhoto[0]]}`}
        />
        <div
          onClick={() => handleSelect(1)}
          className={`${classes.image} ${classes[selectPhoto[1]]}`}
        />
        <div
          onClick={() => handleSelect(2)}
          className={`${classes.image} ${classes[selectPhoto[2]]}`}
        />
        <div
          onClick={() => handleSelect(3)}
          className={`${classes.image} ${classes[selectPhoto[3]]}`}
        />
      </div>
    </div>
  );
}
