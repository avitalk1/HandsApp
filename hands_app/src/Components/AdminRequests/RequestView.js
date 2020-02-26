import React, { useState, useEffect } from "react";
import Typography from "@material-ui/core/Typography";
import { Link as RouterLink } from "react-router-dom";
import { Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import DeleteIcon from "@material-ui/icons/Delete";
import moment from "moment";
import axios from "axios"
const useStyles = makeStyles({
  root: {
    height: "100%",
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-between"
  },
  costumeTextColor:{
    color: "#C4C4C4"
  },
  avatar: {
    backgroundColor: "#FFCB9A",
    color: "#F4976C"
},
  flexContainer: {
    display: "flex",
    justifyContent: "space-between"
  },
  gridContainer: {
    display: "grid",
    justifyContent: "space-between",
    gridTemplateColumns: "35% 65%"
  },
  topContainer: {
    width: "95%",
    height: "10%"
  },
  mainContainer: {
    height: "90%",
    width: "80%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between"
  },
  detailsContainer: {
    width: "40%",
    textAlign: "left"
  },
  imagesContainer: {
    height: "20%"
  },
  image: {
    backgroundColor: "#C4C4C4",
    width: "22%",
    height: "100%"
  },
  descriptionContainer: {
    height: "20%",
    overflow: "auto"
  },
  btnContainer: {
    display: "flex",
    justifyContent: "center"
  },
  acceptBtn: {
    width: "50%",
    background: "#F4976C",
    color: "white",
    boxShadow: "0px 5px 10px rgba(0, 0, 0, 0.25)",
    fontSize: "1.2em",
    borderRadius: "15px",
    marginBottom:"20px"
  }
});


export default function RequestView(props) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [requestView, setRequestView] = useState();
  const [deleted, setDeleted] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleDelete = async () => {
    const user = {requestId: props.request._id}
    try{
      const result = await fetch(`https://hands-app.herokuapp.com/request/rejectRequest/${props.request._id}`, {
        method: 'DELETE'
      })
      setDeleted(true);
    }catch(err){
        console.log(err);
    }
  }
  const handleClose = (flag) => {
    if(flag){
      handleDelete();
    }
    setOpen(false);
  };
  if (props.request && !deleted) {
    return (
      <div className={classes.root}>
        <div className={`${classes.topContainer} ${classes.flexContainer}`}>
          <Avatar className={classes.avatar}>{props.request.requester.name.first[0]}</Avatar>
          <Typography className={classes.costumeTextColor}>
            {moment(props.request.created_date).format("MM/DD/YYYY")}
          </Typography>
        </div>
        <div className={classes.mainContainer}>
          <div className={classes.flexContainer}>
            <Typography>{props.request.subject}</Typography>
            <div>
              <DeleteIcon style={{cursor: "pointer"}}
                className={classes.costumeTextColor}
                variant="outlined"
                color="primary"
                onClick={handleClickOpen}
              />
              <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
              >
                <DialogTitle id="alert-dialog-title">
                  {"Are you sure you went to delete this Request?"}
                </DialogTitle>
                <DialogContent>
                  <DialogContentText id="alert-dialog-description">
                    After clicking agree, this request will no longer appear in
                    the Inbox.
                  </DialogContentText>
                </DialogContent>
                <DialogActions>
                  <Button onClick={()=>handleClose(false)} color="primary">
                    Disagree
                  </Button>
                  <Button onClick={()=>handleClose(true)} color="primary" autoFocus>
                    Agree
                  </Button>
                </DialogActions>
              </Dialog>
            </div>
          </div>
          <div className={classes.descriptionContainer}>
            <Typography>{props.request.description}</Typography>
          </div>
          <div className={classes.detailsContainer}>
            <div className={classes.gridContainer}>
              <Typography>Location:</Typography>
              <Typography>{props.request.location}</Typography>
            </div>
            <div className={classes.gridContainer}>
              <Typography>Dates:</Typography>
              <Typography>{`${moment(props.request.operation_dates.from).format(
                "MM/DD/YYYY"
              )} - ${moment(props.request.operation_dates.to).format(
                "MM/DD/YYYY"
              )}`}</Typography>
            </div>
          </div>
          <div
            className={`${classes.imagesContainer} ${classes.flexContainer}`}
          >
            {props.request.images.map(image => {
              return <img className={classes.image} src={`${image}`} alt={"img"}/>
            })}
          </div>
          <div className={classes.btnContainer}>
            <Button className={classes.acceptBtn} variant="contained" component={RouterLink}
            to={{
              pathname: "/createpost",
              state: { request: props.request, userId: props.userId }
            }}>
              Accept and Write a Post
            </Button>
          </div>
        </div>
      </div>
    );
  } else return null;
}
