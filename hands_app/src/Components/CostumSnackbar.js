import React,  { useState, useEffect} from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }
  
export default function CostumSnackbar(props) {
    const [open, setOpen] = useState(props.openSnackbar);

      const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            props.handleSnackbar();
          return;
        }
        setOpen(false);
        props.handleSnackbar();
      };

      useEffect(()=>{
        setOpen(props.openSnackbar)
      },[props.openSnackbar])
      
    return (
        <div>
            <Snackbar  onClose={handleClose} open={open} autoHideDuration={6000}>
                <Alert onClick={props.handleSnackbar} onClose={handleClose}  severity={props.severity}>
                    {props.messageInfo}
                </Alert>
            </Snackbar>
        </div>
    );
}
