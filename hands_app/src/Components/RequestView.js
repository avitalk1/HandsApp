import React from "react";
import { Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import DeleteIcon from "@material-ui/icons/Delete";

const useStyles = makeStyles({
    topLine: {
        display: "flex",
        justifyContent: "space-between"
    },
    avatar: {
        backgroundColor: "#FFCB9A",
        color: "#F4976C"
    },
    openDate: {
        marginTop: "1%",
        color: "#C4C4C4"
    },
    container: {
        width: "95%",
        marginLeft: "3%",
        marginTop: "6%"
    },
    subject: {
        display: "flex",
        justifyContent: "space-between"
    },
    title: {
        fontSize: "36px",
        fontStyle: "bold"
    },
    delete: {
        color: "#C4C4C4",
        marginTop: "50%"
    },
    description: {
        marginTop: "6%"
    },
    location: {
        marginTop: "6%",
        display: "flex"
    },
    address: {
        marginLeft: "7%"
    },
    opertionDates: {
        marginTop: "6%",
        display: "flex"
    },
    dates: {
        marginLeft: "7%"
    },
    images: {
        marginTop: "6%",
        display: "flex",
        justifyContent: "space-evenly"
    },
    image: {
        backgroundColor: "#C4C4C4",
        width: "22%",
        height: "21vh"
    },
    acceptBtn: {
        marginTop: "9%",
        marginLeft: "18%",
        width: "65%",
        height: "15vh",
        background: "#F4976C",
        color: "white",
        boxShadow: "0px 5px 10px rgba(0, 0, 0, 0.25)",
        fontSize: "1.2em",
        borderRadius: "15px",
    }
});

export default function RequestView() {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div>
            <div className={classes.topLine}>
                <Avatar className={classes.avatar}>R</Avatar>
                <div className={classes.openDate}>01/01/2020</div>
            </div>
            <div>
                <div className={classes.container}>
                    <div className={classes.subject}>
                        <div className={classes.title}>Request Subject</div>
                        <div>
                            <DeleteIcon
                                className={classes.delete}
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
                                    <Button onClick={handleClose} color="primary">
                                        Disagree
                  </Button>
                                    <Button onClick={handleClose} color="primary" autoFocus>
                                        Agree
                  </Button>
                                </DialogActions>
                            </Dialog>
                        </div>
                    </div>
                    <div className={classes.description}>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                        eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
                        ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                        aliquip ex ea commodo consequat.
          </div>
                    <div className={classes.location}>
                        <div>Location:</div>
                        <div className={classes.address}>The location of the request</div>
                    </div>
                    <div className={classes.opertionDates}>
                        <div>Location:</div>
                        <div className={classes.dates}>The location of the request</div>
                    </div>
                    <div className={classes.images}>
                        <div className={classes.image} />
                        <div className={classes.image} />
                        <div className={classes.image} />
                        <div className={classes.image} />
                    </div>
                    <Button className={classes.acceptBtn} variant="contained">Accept and Write a Post</Button>
                </div>
            </div>
        </div>
    );
}
