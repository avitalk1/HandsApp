import React, { useState } from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";

const useStyles = makeStyles({
  flexContainer: {
    display: "flex",
    flexDirection: "column"
  },
  imagesContainer: {
    marginLeft: "25%"
  },
  image: {
    backgroundColor: "#C4C4C4",
    marginTop: "5%",
    width: "35%",
    height: "30vh",
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
    <div>
      <p>Choose a Cover Photo for the post:</p>
      <div className={`${classes.imagesContainer} ${classes.flexContainer}`}>
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
