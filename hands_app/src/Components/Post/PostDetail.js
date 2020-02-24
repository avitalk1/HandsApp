import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import moment from "moment";

const useStyles = makeStyles({
  detailContainer: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "4%"
  },
  detailHeadingContainer: {
    display: "flex",
    color: "#F4976C"
  },
  detailHeading: {
    marginLeft: "2%"
  },
  detailContent: {
    marginLeft: "5%"
  },
  columnStyle:{
    flexDirection:"column"
  },
  descriptionStyle:{
    height:"70px",
    overflow: "auto"
  },
  checkboxes:{
    display: "grid",
    gridTemplateRows: "1fr 1fr",
    gridTemplateColumns: "auto",
    gridAutoFlow: "column",
    marginLeft: "5%"
  }

});

const PostDetail = props => {
  const classes = useStyles();
  const [detailStyle, setDetailStyle] = useState()
  const [contumeContentStyle, setContumeContentStyle] = useState();
  const handleClick = () => {
    props.onSelect(props.postId);
  };
  const contentView = () => {
    const { content, title } = props;
    if (title === "Volunteers" && content) {
      return (
        <Typography className={classes.detailContent}>
          {`${content[0]} / ${content[1]}`}
        </Typography>
      );
    } else if (title === "Professions Needed" && content) {
      return (
        <div className={classes[contumeContentStyle]}>
          {content.map(pro => {
            return (
              <FormControlLabel
                control={<Checkbox checked={false} color="primary" />}
                label={pro}
              />
            );
          })}
        </div>
      );
    }else if(title==="Date"){
       return <Typography className={`${classes.detailContent} ${classes[contumeContentStyle]}`}>{moment(content).format("MM/DD/YYYY")}</Typography>
    }else{
      return (
        <Typography className={`${classes.detailContent} ${classes[contumeContentStyle]}`}>{content}</Typography>
      );
    }
  };

  useEffect(()=>{
    if(props.title === "Description"){
      setDetailStyle("columnStyle");
      setContumeContentStyle("descriptionStyle");
    }
    if(props.title === "Professions Needed"){
      setContumeContentStyle("checkboxes");
      setDetailStyle("columnStyle");
    }
  },[])
  return (
    <div>
      <div>
        <div className={`${classes.detailContainer} ${classes[detailStyle]}`}>
          <div className={classes.detailHeadingContainer}>
            <props.icon />
            <Typography className={classes.detailHeading}>
              {props.title}
            </Typography>
          </div>
          {contentView()}
        </div>
      </div>
    </div>
  );
};

export default PostDetail;
