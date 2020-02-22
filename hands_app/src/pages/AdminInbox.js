import React, { useState, useEffect } from "react";

import { makeStyles } from "@material-ui/core/styles";
import RequestsView from "../Components/AdminRequests/RequestsView";
import RequestView from "../Components/AdminRequests/RequestView";
import { Typography } from "@material-ui/core";

const appRequests = [
  {
    operation_dates: {
      from: "2020-02-01",
      to: "2020-02-10"
    },
    location: {
      street: {
        name: "Bruria",
        number: 5
      },
      entrance: "B",
      apt_number: 6,
      city: "Ramat-Gan",
      floor: 4
    },
    status: "Pending",
    _id: 1,
    subject: "First Request",
    requester: "5e2f0d58627eff0017da3ff2",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    created_date: "2020-01-27T16:18:32.693Z"
  },
  {
    operation_dates: {
      from: "2020-02-01",
      to: "2020-02-10"
    },
    location: {
      street: {
        name: "Bruria",
        number: 5
      },
      entrance: "B",
      apt_number: 6,
      city: "Ramat-Gan",
      floor: 4
    },
    status: "Pending",
    _id: 2,
    subject: "Second Request",
    requester: "5e2f0d58627eff0017da3ff2",
    description: "First Request Description ...",
    created_date: "2020-01-27T16:18:32.693Z"
  },
  {
    operation_dates: {
      from: "2020-02-01",
      to: "2020-02-10"
    },
    location: {
      street: {
        name: "Bruria",
        number: 5
      },
      entrance: "B",
      apt_number: 6,
      city: "Ramat-Gan",
      floor: 4
    },
    status: "Pending",
    _id: 3,
    subject: "3rd Request",
    requester: "5e2f0d58627eff0017da3ff2",
    description: "First Request Description ...",
    created_date: "2020-01-27T16:18:32.693Z"
  },
  {
    operation_dates: {
      from: "2020-02-01",
      to: "2020-02-10"
    },
    location: {
      street: {
        name: "Bruria",
        number: 5
      },
      entrance: "B",
      apt_number: 6,
      city: "Ramat-Gan",
      floor: 4
    },
    status: "Pending",
    _id: 4,
    subject: "4th Request",
    requester: "5e2f0d58627eff0017da3ff2",
    description: "First Request Description ...",
    created_date: "2020-01-27T16:18:32.693Z"
  },
  {
    operation_dates: {
      from: "2020-02-01",
      to: "2020-02-10"
    },
    location: {
      street: {
        name: "Bruria",
        number: 5
      },
      entrance: "B",
      apt_number: 6,
      city: "Ramat-Gan",
      floor: 4
    },
    status: "Pending",
    _id: 5,
    subject: "5th Request",
    requester: "5e2f0d58627eff0017da3ff2",
    description: "First Request Description ...",
    created_date: "2020-01-27T16:18:32.693Z"
  },
  {
    operation_dates: {
      from: "2020-02-01",
      to: "2020-02-10"
    },
    location: {
      street: {
        name: "Bruria",
        number: 5
      },
      entrance: "B",
      apt_number: 6,
      city: "Ramat-Gan",
      floor: 4
    },
    status: "Pending",
    _id: 6,
    subject: "6th Request",
    requester: "5e2f0d58627eff0017da3ff2",
    description: "First Request Description ...",
    created_date: "2020-01-27T16:18:32.693Z"
  },
  {
    operation_dates: {
      from: "2020-02-01",
      to: "2020-02-10"
    },
    location: {
      street: {
        name: "Bruria",
        number: 5
      },
      entrance: "B",
      apt_number: 6,
      city: "Ramat-Gan",
      floor: 4
    },
    status: "Pending",
    _id: 7,
    subject: "7th Request",
    requester: "5e2f0d58627eff0017da3ff2",
    description: "First Request Description ...",
    created_date: "2020-01-27T16:18:32.693Z"
  },
  {
    operation_dates: {
      from: "2020-02-01",
      to: "2020-02-10"
    },
    location: {
      street: {
        name: "Bruria",
        number: 5
      },
      entrance: "B",
      apt_number: 6,
      city: "Ramat-Gan",
      floor: 4
    },
    status: "Pending",
    _id: 8,
    subject: "8th Request",
    requester: "5e2f0d58627eff0017da3ff2",
    description: "First Request Description ...",
    created_date: "2020-01-27T16:18:32.693Z"
  },
  {
    operation_dates: {
      from: "2020-02-01",
      to: "2020-02-10"
    },
    location: {
      street: {
        name: "Bruria",
        number: 5
      },
      entrance: "B",
      apt_number: 6,
      city: "Ramat-Gan",
      floor: 4
    },
    status: "Pending",
    _id: 9,
    subject: "9th Request",
    requester: "5e2f0d58627eff0017da3ff2",
    description: "First Request Description ...",
    created_date: "2020-01-27T16:18:32.693Z"
  },
  {
    operation_dates: {
      from: "2020-02-01",
      to: "2020-02-10"
    },
    location: {
      street: {
        name: "Bruria",
        number: 5
      },
      entrance: "B",
      apt_number: 6,
      city: "Ramat-Gan",
      floor: 4
    },
    status: "Pending",
    _id: 10,
    subject: "10th Request",
    requester: "5e2f0d58627eff0017da3ff2",
    description: "First Request Description ...",
    created_date: "2020-01-27T16:18:32.693Z"
  },
  {
    operation_dates: {
      from: "2020-02-01",
      to: "2020-02-10"
    },
    location: {
      street: {
        name: "Bruria",
        number: 5
      },
      entrance: "B",
      apt_number: 6,
      city: "Ramat-Gan",
      floor: 4
    },
    status: "Pending",
    _id: 11,
    subject: "11th Request",
    requester: "5e2f0d58627eff0017da3ff2",
    description: "First Request Description ...",
    created_date: "2020-01-27T16:18:32.693Z"
  },
  {
    operation_dates: {
      from: "2020-02-01",
      to: "2020-02-10"
    },
    location: {
      street: {
        name: "Bruria",
        number: 5
      },
      entrance: "B",
      apt_number: 6,
      city: "Ramat-Gan",
      floor: 4
    },
    status: "Pending",
    _id: 12,
    subject: "12th Request",
    requester: "5e2f0d58627eff0017da3ff2",
    description: "First Request Description ...",
    created_date: "2020-01-27T16:18:32.693Z"
  },
  {
    operation_dates: {
      from: "2020-02-01T00:00:00.000Z",
      to: "2020-02-10T00:00:00.000Z"
    },
    location: {
      street: {
        name: "Bruria",
        number: 5
      },
      entrance: "B",
      apt_number: 6,
      city: "Ramat-Gan",
      floor: 4
    },
    status: "Pending",
    _id: 13,
    subject: "13th Request",
    requester: "5e2f0d58627eff0017da3ff2",
    description: "First Request Description ...",
    created_date: "2020-01-27T16:18:32.693Z"
  },
  {
    operation_dates: {
      from: "2020-02-01T00:00:00.000Z",
      to: "2020-02-10T00:00:00.000Z"
    },
    location: {
      street: {
        name: "Bruria",
        number: 5
      },
      entrance: "B",
      apt_number: 6,
      city: "Ramat-Gan",
      floor: 4
    },
    status: "Pending",
    _id: 14,
    subject: "14th Request",
    requester: "5e2f0d58627eff0017da3ff2",
    description: "First Request Description ...",
    created_date: "2020-01-27T16:18:32.693Z"
  },
  {
    operation_dates: {
      from: "2020-02-01T00:00:00.000Z",
      to: "2020-02-10T00:00:00.000Z"
    },
    location: {
      street: {
        name: "Bruria",
        number: 5
      },
      entrance: "B",
      apt_number: 6,
      city: "Ramat-Gan",
      floor: 4
    },
    status: "Pending",
    _id: 15,
    subject: "15th Request",
    requester: "5e2f0d58627eff0017da3ff2",
    description: "First Request Description ...",
    created_date: "2020-01-27T16:18:32.693Z"
  },
  {
    operation_dates: {
      from: "2020-02-01T00:00:00.000Z",
      to: "2020-02-10T00:00:00.000Z"
    },
    location: {
      street: {
        name: "Bruria",
        number: 5
      },
      entrance: "B",
      apt_number: 6,
      city: "Ramat-Gan",
      floor: 4
    },
    status: "Pending",
    _id: 16,
    subject: "16th Request",
    requester: "5e2f0d58627eff0017da3ff2",
    description: "First Request Description ...",
    created_date: "2020-01-27T16:18:32.693Z"
  },
  {
    operation_dates: {
      from: "2020-02-01T00:00:00.000Z",
      to: "2020-02-10T00:00:00.000Z"
    },
    location: {
      street: {
        name: "Bruria",
        number: 5
      },
      entrance: "B",
      apt_number: 6,
      city: "Ramat-Gan",
      floor: 4
    },
    status: "Pending",
    _id: 17,
    subject: "17th Request",
    requester: "5e2f0d58627eff0017da3ff2",
    description: "First Request Description ...",
    created_date: "2020-01-27T16:18:32.693Z"
  },
  {
    operation_dates: {
      from: "2020-02-01T00:00:00.000Z",
      to: "2020-02-10T00:00:00.000Z"
    },
    location: {
      street: {
        name: "Bruria",
        number: 5
      },
      entrance: "B",
      apt_number: 6,
      city: "Ramat-Gan",
      floor: 4
    },
    status: "Pending",
    _id: 18,
    subject: "18th Request",
    requester: "5e2f0d58627eff0017da3ff2",
    description: "First Request Description ...",
    created_date: "2020-01-27T16:18:32.693Z"
  },
  {
    operation_dates: {
      from: "2020-02-01T00:00:00.000Z",
      to: "2020-02-10T00:00:00.000Z"
    },
    location: {
      street: {
        name: "Bruria",
        number: 5
      },
      entrance: "B",
      apt_number: 6,
      city: "Ramat-Gan",
      floor: 4
    },
    status: "Pending",
    _id: 19,
    subject: "19th Request",
    requester: "5e2f0d58627eff0017da3ff2",
    description: "First Request Description ...",
    created_date: "2020-01-27T16:18:32.693Z"
  }
];
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
    width: "64%"
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

export default function AdminInbox() {
  const [requests, setRequests] = useState([]);
  const [selectedRequest, setSelectedRequest] = useState();
  const classes = useStyles();
  useEffect(() => {
    setRequests(appRequests);
  }, []);
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
        <RequestView request={selectedRequest} />
      </div>
      </div>
    </div>
  );
}
