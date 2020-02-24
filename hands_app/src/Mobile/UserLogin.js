import React, { useState, useEffect } from "react";
import Login from "../Components/Login";
import { makeStyles } from "@material-ui/core/styles";
const useStyles = makeStyles({
    formWrapper: {
        width: "100%"
    },
    header: {
        background: "rgba(255, 255, 255, 0.14)",
        width: "100%",
        height: "46px"
    },

    haederBackground: {
        height: "500px",
        width: "180%",
        background: "linear-gradient(47.04deg, #07889B -14.33%, #66B9BF 75.92%, #FF9AF5 117.11%)",
        borderRadius: "90%",
        marginTop: "-320px",
        marginLeft: "-350px",
        position: "fixed"
    },
    subject: {
        color: "white",
        marginLeft: "35px",
        marginTop: 0,
        position: "relative",
        zIndex: 100
    },
    welcome: {
        marginTop: "20%",
        fontSize: "45px"
    },
    formContainer: {
        width: "100%",
        marginTop: "10%",
        marginLeft: "10%"
    },
})
const UserLogin = (props) => {
    const classes = useStyles();
    const [connectionType, setConnectionType] = useState(props.location.state.connectionType)
    const [formHeight, setFormHeight] = useState("")

    let content = (
        <div className={classes.formWrapper}>

            <div className={classes.header}></div>
            <div className={classes.subject}><h1 className={classes.welcome}>Welcome!</h1></div>
            <div className={classes.haederBackground} />
            <div className={classes.formContainer}>
                <div>{
                    <Login />
                }</div>
            </div>
        </div>

    )

    return content;
}

export default UserLogin

