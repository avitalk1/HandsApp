import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import CalendarTodayIcon from "@material-ui/icons/CalendarToday";
import DescriptionIcon from "@material-ui/icons/Description";
import SentimentSatisfiedOutlinedIcon from "@material-ui/icons/SentimentSatisfiedOutlined";
import BuildOutlinedIcon from "@material-ui/icons/BuildOutlined";
import PostDetail from "./PostDetail";
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
const useStyles = makeStyles({
  root: {
    width: 345,
    height: 200,
    backgroundImage:
      "url('https://www.imagesjunction.com/images/img/rose_images.jpg')",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    marginBottom: "40px",
    borderRadius: "20px"
  },

  detailContainer: {
    display: "flex"
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
    marginBottom: "5px"
  },

  postView: {
    width: "80%"
  },
  joinBtn: {
    width: "100%",
    background: "#F4976C",
    color: "white",
    boxShadow: "0px 5px 10px rgba(0, 0, 0, 0.25)",
    fontSize: "36px",
    marginTop: "50px",
    marginBottom: "50px",
    borderRadius: "15px"
  }
});

const PostView = props => {
  const classes = useStyles();

  const handleClick = () => {
    //console.log(props.postContent);
  };
  return (
    <div className={classes.postView}>
      <div className={classes.postViewTitle}>
        <Typography style={{ fontSize: "2.25em" }}>
          {props.postContent.title}
        </Typography>
      </div>
      <Card className={classes.root} onClick={handleClick} />
      <div className={classes.postDetailsContainer}>
        {postDetails.map(detail => {
          return (
            <PostDetail
              key={detail.key}
              icon={detail.icon}
              title={detail.title}
              content={props.postContent[detail.valuePath]}
              isArray={detail.isArray}
            />
          );
        })}
      </div>
      <Button className={classes.joinBtn} variant="contained">
        JOIN
      </Button>
    </div>
  );
};

export default PostView;
