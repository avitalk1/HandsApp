import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
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
  }
});

const PostDetail = props => {
  const classes = useStyles();
  //const [postProps, setPostProps] = useState(props);
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
        <div>
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
    } else {
      return (
        <Typography className={classes.detailContent}>{content}</Typography>
      );
    }
  };

  return (
    <div>
      <div>
        <div className={classes.detailContainer}>
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
