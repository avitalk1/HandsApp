import React,{useState, useEffect} from "react";
import { makeStyles } from "@material-ui/core/styles";
import ListItem from "@material-ui/core/ListItem";
import Divider from "@material-ui/core/Divider";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import moment from "moment";

const useStyles = makeStyles(theme => ({
  notSelected:{
    background:"#F0F5F7"
  },
  selected:{
    background:"white"
  },
  inline: {
    display: "inline"
  },
  req_header: {
    display: "flex",
    justifyContent: "space-between"
  }
}));

export default function RequestThumbnail(props) {
  const classes = useStyles();
  const [listItemStyle, setListItemStyle] = useState("notSelected")
  const handleOnClick = () => {
    setListItemStyle("selected")
    props.onSelect(props.index);

  };
  const formatTextDescription = text => {
    if (text.length >= 100) {
      return `${text.substring(0, 100)}...`;
    } else {
      return text;
    }
  };
  useEffect(()=>{
    if(props.index === props.selectedIndex){
      console.log(props.index, "im selected")
      setListItemStyle("selected")
    }else{
      setListItemStyle("notSelected")
    }
  },[props.selectedIndex])
  return (
    <div>
      <ListItem className={classes[listItemStyle]} style={{cursor: "pointer"}} onClick={handleOnClick} alignItems="flex-start">
        <ListItemAvatar>
          <Avatar className={classes.avatar}>R</Avatar>
        </ListItemAvatar>
        <ListItemText
          primary={
            <div className={classes.req_header}>
              <span>{props.subject}</span>
              <span>{moment(props.date).format("MM/DD/YYYY")}</span>
            </div>
          }
          secondary={
            <React.Fragment>
              <Typography
                component="span"
                variant="body2"
                className={classes.inline}
                color="textPrimary"
              >
                Ali Connors
              </Typography>
              {formatTextDescription(props.description)}
            </React.Fragment>
          }
        />
      </ListItem>
      <Divider variant="inset" component="li" />
    </div>
  );
}
