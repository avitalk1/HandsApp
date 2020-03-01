import React, { useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import { Container, Box, Button, Avatar, Dialog, DialogActions, Typography, DialogContent, DialogContentText, DialogTitle, Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import DeleteIcon from "@material-ui/icons/Delete";
import moment from "moment";
const useStyles = makeStyles({
  requestViewContainer: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  costumeTextColor: {
    color: "#C4C4C4"
  },
  avatar: {
    backgroundColor: "#FFCB9A",
    color: "#F4976C"
  },
  gridContainer: {
    width: "40%",
    display: "grid",
    justifyContent: "space-between",
    gridTemplateColumns: "35% 65%"
  },
  image: {
    width: "22%",
    height:"120px"
  },
  descriptionContainer: {
    height: "20%",
    overflow: "auto"
  },
  acceptBtn: {
    width: "50%",
    background: "#F4976C",
    color: "white",
    boxShadow: "0px 5px 10px rgba(0, 0, 0, 0.25)",
    fontSize: "1.2em",
    borderRadius: "15px",
    marginTop: "5%"
  }
});


export default function RequestView(props) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [deleted, setDeleted] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleDelete = async () => {
    const user = { requestId: props.request._id }
    try {
      const result = await fetch(`https://hands-app.herokuapp.com/request/rejectRequest/${props.request._id}`, {
        method: 'DELETE'
      })
      setDeleted(true);
    } catch (err) {
      console.log(err);
    }
  }
  const handleClose = (flag) => {
    if (flag) {
      handleDelete();
    }
    setOpen(false);
  };
  if (props.request && !deleted) {
    return (
      <Container className={classes.requestViewContainer}>
        <Grid container justify="space-between" style={{ width: "100%" }}>
          <Avatar className={classes.avatar}>{props.request.requester.name.first[0]}</Avatar>
          <Typography  className={classes.costumeTextColor}>
            {moment(props.request.created_date).format("MM/DD/YYYY")}
          </Typography>
        </Grid>
        <Grid container direction="column" justify="space-between" style={{ height: "100%" , width: "80%" }}>
          <Grid container justify="space-between" style={{ width: "100%" }}>
            <Typography>{props.request.subject}</Typography>
            <DeleteIcon style={{ cursor: "pointer" }}
              className={classes.costumeTextColor}
              variant="outlined"
              color="primary"
              onClick={handleClickOpen}
            />
          </Grid>
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
              <Button onClick={() => handleClose(false)} color="primary">
                Disagree
                  </Button>
              <Button onClick={() => handleClose(true)} color="primary" autoFocus>
                Agree
                  </Button>
            </DialogActions>
          </Dialog>
          <Box className={classes.descriptionContainer}>
            <Typography>{props.request.description}</Typography>
          </Box>
          <Box style={{height:"20%"}}>
          <Grid className={classes.gridContainer}>
            <Typography>Location:</Typography>
            <Typography>{props.request.location}</Typography>
          </Grid>
          <Grid className={classes.gridContainer}>
            <Typography>Dates:</Typography>
            <Typography>{`${moment(props.request.operation_dates.from).format(
              "MM/DD/YYYY"
            )} - ${moment(props.request.operation_dates.to).format(
              "MM/DD/YYYY"
            )}`}</Typography>
          </Grid>
          </Box>
          <Grid container justify="space-between" style={{ height: "30%" }}>
            {props.request.images.map(image => {
              return <img className={classes.image} src={`${image}`} alt={"img"} />
            })}
          </Grid>
          
        </Grid>
        <Button className={classes.acceptBtn} variant="contained" component={RouterLink}
            to={{
              pathname: "/createpost",
              state: { request: props.request, userId: props.userId }
            }}>
            Accept and Write a Post
            </Button>
      </Container>
    );
  } else return null;
}
