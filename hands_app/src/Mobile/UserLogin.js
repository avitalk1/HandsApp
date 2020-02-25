import React from "react";
import Login from "../Components/Login";
import { makeStyles } from "@material-ui/core/styles";
const useStyles = makeStyles({
    formWrapper: {
        width: "100%",
        '& .mobileFooter': {
            display: "none"
        }
    },
    header: {
        background: "rgba(255, 255, 255, 0.14)",
        width: "100%",
        height: "46px"
    },
    root: {
        position: "fixed",
        height: "100vh",
        marginTop: 0,
        width: "100%",
        clipPath: "ellipse(85% 50% at 20% 5%)",
        background: "linear-gradient(44.78deg, #07889B -14.33%, #66B9BF 60.38%, #FF9AF5 160.11%)",
    },
    subject: {
        color: "white",
        marginLeft: "35px",
        position: "relative",
        zIndex: 100,
        fontSize: "24px",
        marginTop: "10%",
    },
    formContainer: {
        width: "100%",
        marginTop: "10%",
        marginLeft: "10%"
    },
})
const UserLogin = (props) => {
    props.onPageLoad(window.location.pathname);
    const classes = useStyles();

    let content = (
        <div className={classes.formWrapper}>
            <div className={classes.root}> </div>
            <div className={classes.topContainer}>
                <div className={classes.header}></div>
                <div className={classes.subject}><h1>Welcome!</h1></div>
                <div className={classes.haederBackground} />
                <div className={classes.formContainer}>
                    <div>{
                        <Login />
                    }</div>
                </div>
            </div>
        </div>
    )

    return content;
}

export default UserLogin

