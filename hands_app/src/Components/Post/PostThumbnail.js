import React, {useState, useEffect} from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import moment from "moment";

const useStyles = makeStyles({
  root: {
    width: 250,
    height: 150,
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    marginBottom: "4%",
    borderRadius: "20px",
    marginRight: "50px",
  },
  cardContent: {
    display: "flex",
    justifyContent: "space-between",
    background: "rgba(255,255,255,0.7)",
    marginTop: "95px",
    fontSize: "10px",
    color: "black",
    padding:"8px",
    height:"100px",
    alignContent:"center"
  },
  selected:{
    boxShadow: "0px 5px 10px rgba(0, 0, 0, 0.25)",
  }
});

const PostThumbnail = props => {
  console.log(props)
  const classes = useStyles();
  const [seletedStyle, setSelectedStyle] =useState()
  const handleClick = () => {
    props.onSelect(props.postIndex);
  };
  useEffect(()=>{
    if(props.selectedPostI === props.postIndex){
      setSelectedStyle("selected");
    }else{
      setSelectedStyle(""); 
    }
  },[props.selectedPostI])
  return (
    <Card  style={{backgroundImage:`url('${props.image}')`}} className={`${classes.root} ${classes[seletedStyle]} `} onClick={handleClick}>
      <CardActionArea>
        <CardContent className={classes.cardContent}>
          <Typography gutterBottom>{props.title}</Typography>
          <Typography gutterBottom>{moment(props.date).format("MM/DD/YYYY")}</Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default PostThumbnail;
