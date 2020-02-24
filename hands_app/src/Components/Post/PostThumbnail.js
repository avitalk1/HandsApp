import React, {useState, useEffect} from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles({
  root: {
    width: 250,
    height: 150,
    backgroundImage:
      "url('https://www.imagesjunction.com/images/img/rose_images.jpg')",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    marginBottom: "4%",
    borderRadius: "20px",
    marginRight: "50px"
  },
  mobileRoot:{
    width: "100px",
    height: "100px",
    backgroundImage:
      "url('https://www.imagesjunction.com/images/img/rose_images.jpg')",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    marginBottom: "4%",
    borderRadius: "20px",
    marginRight:"10px",
    marginLeft:"10px",
  },
  cardContent: {
    display: "flex",
    justifyContent: "space-between",
    background: "rgba(255,255,255,0.7)",
    marginTop: 100,
    fontSize: "10px",
    color: "black"
  },
  selected:{
    boxShadow: "0px 5px 10px rgba(0, 0, 0, 0.25)",
  }
});

const PostThumbnail = props => {
  const classes = useStyles();
  const [selectedStyle, setSelectedStyle] =useState();
  const [isMobile, setIsMobile] = useState();
  const handleClick = () => {
    props.onSelect(props.postIndex);
  };

  useEffect(()=>{
    if(props.isMobile){
      setIsMobile("mobileRoot");
    }else{
      setIsMobile("root");
    }
  },[])
  useEffect(()=>{
    if(props.selectedPostI === props.postIndex){
      setSelectedStyle("selected");
    }else{
      setSelectedStyle(""); 
    }
  },[props.selectedPostI])
  return (
    <Card className={`${classes[isMobile]} ${classes[selectedStyle]} `} onClick={handleClick}>
      <CardActionArea>
        <CardContent className={classes.cardContent}>
          <Typography gutterBottom>{props.title}</Typography>
          <Typography gutterBottom>{props.date}</Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default PostThumbnail;
