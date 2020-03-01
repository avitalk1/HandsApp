import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {Card, Button, Typography} from "@material-ui/core";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import CalendarTodayIcon from "@material-ui/icons/CalendarToday";
import DescriptionIcon from "@material-ui/icons/Description";
import SentimentSatisfiedOutlinedIcon from "@material-ui/icons/SentimentSatisfiedOutlined";
import BuildOutlinedIcon from "@material-ui/icons/BuildOutlined";
import { Redirect } from "react-router";
import CostumeSnackbar from "../CostumSnackbar";
import PostDetail from "./PostDetail";
import axios from "axios";
const postDetails = [
  {
    icon: LocationOnIcon,
    title: "Location",
    key: "locationIcon",
    valuePath: "location",
    isArray: false
  },
  {
    icon: CalendarTodayIcon,
    title: "Date",
    key: "dateicon",
    valuePath: "date",
    isArray: false
  },
  {
    icon: DescriptionIcon,
    title: "Description",
    key: "descriptionIcon",
    valuePath: "description",
    isArray: false
  },
  {
    icon: SentimentSatisfiedOutlinedIcon,
    title: "Volunteers",
    key: "volunteerIcon",
    valuePath: "num_of_voulnteers",
    isArray: true
  },
  {
    icon: BuildOutlinedIcon,
    title: "Professions Needed",
    key: "toolIcon",
    valuePath: "professions",
    isArray: true
  }
];
const useStyles = makeStyles(theme=>({
  root: {
    width: 250,
    height: 150,
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    marginBottom: "40px",
    borderRadius: "20px",
    boxShadow: "0px 5px 10px rgba(0, 0, 0, 0.25)",
    '@media (max-width: 415px)':{
      marginTop:"150px",
      marginBottom:"10px",
      width: 200,
      height: 120,
    }
  },
  mobileRoot: {
    width: "80%",
    marginLeft: "10%",
  },
  centeredContainer: {
    display: "flex",
    justifyContent: "center",
  },
  detailContainer: {
    display: "flex",
  },
  detailHeadingContainer: {
    display: "flex",
    color: "#FFCB9A"
  },
  detailHeading: {
    marginLeft: "2%"
  },
  detailContent: {
    marginLeft: "5%"
  },
  postDetailsContainer: {
    width: "100%",
    height: "40%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between"
  },
  postViewTitle: {
    display: "flex",
    justifyContent: "center",
    color: "#F4976C",
    marginTop: "5px",
    marginBottom: "5px",
    position: "relative",
    '@media (max-width: 415px)':{
      marginTop:"40px",
      justifyContent: "stretch",
      color: "white",
      position: "absolute"
    }
  },
  postView: {
    width: "80%",
    '@media (max-width: 415px)':{
      width: "100%",
    }
  },
  joinBtn: {
    width: "65%",
    background: "#F4976C",
    color: "white",
    boxShadow: "0px 5px 10px rgba(0, 0, 0, 0.25)",
    fontSize: "36px",
    marginTop: "60px",
    marginBottom: "50px",
    borderRadius: "15px",
    '@media (max-width: 415px)':{
      fontSize: "16px",
      margin: "0px",
      borderRadius: "15px"
    }
  }
 
}));



const PostView = props => {
  const classes = useStyles();
  const [selectedStyle, setSelectedStyle] = useState();
  const [isMobile, setIsMobile] = useState();
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const putData = async () => {
    let user = { volunteersId: props.userId}
    try{
      await axios.put(`https://hands-app.herokuapp.com/post/${props.postContent.id}/joinEvent`, user)
      if(props.isMobile){
          props.onJoin();
      }
      else{
        console.log("in else ")
        setOpenSnackbar(true);
      }
    }catch(err){
      console.log(err)
    }
  }
  const handleClick = () => {
    putData()
  };

  useEffect(() => {
    if (props.isMobile) {
      setIsMobile("mobileRoot");
    } else {
      setIsMobile("postView");
    }
  },[])
  useEffect(() => {
    if (props.selectedPostI === props.postIndex) {
      setSelectedStyle("selected");
    } else {
      setSelectedStyle("");
    }
  },[])
    return (
    <div className={`${classes[isMobile]} ${classes[selectedStyle]} `}>
      <div className={classes.postViewTitle}>
        <Typography style={{ fontSize: "1.5em", fontWeight:"bold" }}>
          {props.postContent.title}
        </Typography>
      </div>
      <div className={classes.centeredContainer}>
      <Card style={{backgroundImage:`url('${props.postContent.image}')`}} className={classes.root} onClick={handleClick} />
      </div>
      <div className={classes.postDetailsContainer}>
        {postDetails.map(detail => {
          return (
            <PostDetail
              key={`postDetail${detail.key}`}
              icon={detail.icon}
              title={detail.title}
              content={props.postContent[detail.valuePath]}
              isArray={detail.isArray}
            />
          );
        })}
      </div>
      <div className={classes.centeredContainer}>
      <Button onClick={handleClick} className={classes.joinBtn} variant="contained">
        JOIN
      </Button>
      </div>
      <CostumeSnackbar severity={"success"} messageInfo={"Yes! You Joined This Event"} openSnackbar={openSnackbar} handleSnackbar={()=>setOpenSnackbar(false)}/>
    </div>
  );
};

export default PostView;
