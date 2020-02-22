import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import backgroundPhoto from '../images/requestBackground.png';
import requestForm from '../Components/RequestForm';
import RequestForm from '../Components/RequestForm';

const useStyles = makeStyles({
    Background: {
        backgroundColor: "#F0F5F7",
    },
    requestBackground: {
        minWidth: "100%",
        minHeight: "90vh",
        background: `url(${backgroundPhoto})`,
        backgroundSize: "contain",
        backgroundRepeat: "round",
        opacity: "60%",
        position:"absolute"
    },
    title: {
        position: "absolute",
        width: "20%",
        marginTop: "2%",
        marginLeft: "5%",
        color: "#07889B",
        fontWeight: "bold",
        fontSize: "48px"
    },
    formContainer: {
        position: "absolute",
        width: "40%",
        height: "80vh",
        marginLeft: "30%",
        marginTop: "2%",
        backgroundColor: " rgba(255, 255, 255, 0.5)",
        borderRadius: "5%",
    },
    requestForm: {
        display: "flex",
        justifyContent: "center"

    }
})


export default function Request() {
    const classes = useStyles();
    return (
        <div className={classes.Background}>
            <div className={classes.title}>Need Some Help?</div>
            <div className={classes.requestBackground}/>
            <div className={classes.formContainer}>
                <div className={classes.requestForm}><RequestForm /></div>
            </div>
        </div>

    )
}

