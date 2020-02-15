
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
    height:200,
    backgroundImage:"url('https://www.imagesjunction.com/images/img/rose_images.jpg')",
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
  },
  testing:{
    display:'flex',
    justifyContent:'space-between',
    background: 'rgba(255,255,255,0.5)',
    marginTop:130
  }
});

export default function PostThumbnail() {
  const classes = useStyles();
  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardContent className={classes.testing}>
          <Typography gutterBottom variant="h5" component="h2">
            Lizard
          </Typography>
          <Typography gutterBottom variant="h5" component="h2">
            02/02/2020
          </Typography>
        </CardContent>
      </CardActionArea>
     
    </Card>
  );
}
