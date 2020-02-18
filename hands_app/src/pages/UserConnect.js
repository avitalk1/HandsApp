import React, { useState } from 'react'
import Signup from "../Components/Signup";
import Login from "../Components/Login";
import { makeStyles } from "@material-ui/core/styles";
const useStyles = makeStyles({
    formWrapper: {
        height: "90vh",
        position: "relative"
    },
    bgContainer: {
        display: "flex",
        height: "100%"
    },
    rightColumn: {
        backgroundColor: "white",
        width: "40%"
    },
    leftColumn: {
        background: "linear-gradient(253.16deg, #B4DFE5 1.55%, #07889B 95.8%)",
        width: "60%",
    },
    formContainer: {
        backgroundColor: "white",
        width: "35%",
        height: "fit-content",
        top: "15%",
        left: "50%",
        position: "absolute",
        borderRadius: "20px",
        boxShadow: "0px 15px 30px rgba(0, 0, 0, 0.5)",
        display: "flex",
        justifyContent: "center"
    },
    welcome: {
        width: "70%",
        margin: "0px",
        lineHeight: "84px",
        letterSpacing: "0.1em",
        color: "#2C3531",
        paddingLeft: "10%"
    },
    welcomeHeading: {
        paddingTop: "30%",
        fontWeight: "bold",
        fontSize: "65px",
    },
    welcomeMessage: {
        paddingTop: "20px",
        fontWeight: "normal",
        fontSize: "45px"
    }
})
const UserConnect = (props) => {
    const [connectionType, setConnectionType] = useState(props.location.state.connectionType)
    const classes = useStyles();
    let content = (
        <div className={classes.formWrapper}>
            <div className={classes.bgContainer}>
                <div className={classes.leftColumn}>
                    <h1 className={` ${classes.welcome} ${classes.welcomeHeading} `}>WELCOME</h1>
                    <h2 className={`${classes.welcome} ${classes.welcomeMessage}`}>{(connectionType === "signup" ? "We’re glad you’re here !" : "It’s nice to have you back !")}</h2>
                </div>
                <div className={classes.rightColumn}></div>
            </div>
            <div className={classes.formContainer}>{
                (connectionType === "signup" ? <Signup /> : <Login />)
            }</div>
        </div>
    )



    return content;
}

export default UserConnect
