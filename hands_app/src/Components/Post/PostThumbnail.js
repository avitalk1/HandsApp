import React from "react";
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
    marginBottom: "50px",
    borderRadius: "20px",
    marginRight: "50px"
  },
  testing: {
    display: "flex",
    justifyContent: "space-between",
    background: "rgba(255,255,255,0.7)",
    marginTop: 100,
    fontSize: "10px",
    color: "black"
  }
});

const PostThumbnail = props => {
  const classes = useStyles();
  const handleClick = () => {
    props.onSelect(props.postIndex);
  };
  return (
    <Card className={classes.root} onClick={handleClick}>
      <CardActionArea>
        <CardContent className={classes.testing}>
          <Typography gutterBottom>{props.title}</Typography>
          <Typography gutterBottom>{props.date}</Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default PostThumbnail;
