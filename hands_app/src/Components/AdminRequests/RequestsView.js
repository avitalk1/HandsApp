import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import RequestThumbnail from "./RequestThumbnail";
const useStyles = makeStyles(theme => ({
  root: {
    height: "80vh",
    overflow: "auto"
  },
  inline: {
    display: "inline"
  }
}));

export default function RequestView(props) {
  const classes = useStyles();
  const [selectedIndex, selSelectedIndex] = useState(0)
  const handleOnSelect = (index) =>{
    selSelectedIndex(index)
    props.onSelect(index);
  }
  return (
    <List className={classes.root}>
      {props.requests.map((req, index) => (
        <RequestThumbnail
          key={index}
          index={index}
          subject={req.subject}
          description={req.description}
          date={req.created_date}
          onSelect={handleOnSelect}
          selectedIndex={selectedIndex}
        />
      ))}
    </List>
  );
}
