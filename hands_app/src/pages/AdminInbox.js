import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import RequestsView from "../Components/AdminRequests/RequestsView";
import RequestView from "../Components/AdminRequests/RequestView";
import { Typography } from "@material-ui/core";
import axios from "axios"


const useStyles = makeStyles({
  root: {
    width: "100%",
    height: "90vh",
    display: "flex",
    flexDirection:"column",
    justifyContent:"space-between"
  },
  inboxView: {
    width: "44%"
  },
  requestView: {
    width: "64%",
    height:"90%"
  },
  pageTitle: {
    marginTop: "4%",
    marginLeft: "2%",
    fontWeight: "bold",
    lineHeight: "56px",
    letterSpacing: "0.1em",
    fontSize: "2em",
    color: "#07889B"
  },
  pageBody:{
    display: "flex",
    height:"80vh",
    overflow:"hidden"
  }
});

export default function AdminInbox(props) {
  const [requests, setRequests] = useState([]);
  const [selectedRequest, setSelectedRequest] = useState();
  const [doRerender, setDoRerender] = useState(props.location.state.rerender);
  const classes = useStyles();
  const fetchRequests = async () => {
    try{
      const results = await axios.get(`https://hands-app.herokuapp.com/request/showAll`);
      setRequests(results.data)
    }catch(err){
      console.log(err);
    }
     
  }
  useEffect(() => {
    fetchRequests();
  }, [doRerender]);
  useEffect(() => {
    if (requests.length !== 0) {
      handleRequestSelect(0);
    }
  }, [requests]);
  const handleRequestSelect = value => {
    setSelectedRequest(requests[value]);
  };
  return (
    <div className={classes.root}>
      <Typography className={classes.pageTitle}>Requests Inbox</Typography>
      <div className={classes.pageBody}>
      <div className={classes.inboxView}>
        <RequestsView requests={requests} onSelect={handleRequestSelect} />
      </div>
      <div className={classes.requestView}>
        <RequestView request={selectedRequest} userId={props.location.state.userId} />
      </div>
      </div>
    </div>
  );
}
