import React , {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import RequestThumbnail from './RequestThumbnail'
const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
  inline: {
    display: 'inline',
  },
}));

export default function RequestView() {
const [numOfRequests, setNumOfRequests] = useState(20);
  const classes = useStyles();

  return (
    <List>
        {Array.from(Array(numOfRequests)).map((x, index) =>   
            <RequestThumbnail key={index}/>
        )}
    </List>
)
}
