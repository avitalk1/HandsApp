import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import PostView from "../Components/Post/PostView";
const useStyles = makeStyles({
    formWrapper: {
        width: "100%",
    },
    header: {
        background: "rgba(255, 255, 255, 0.14)",
        width: "100%",
        height: "46px"
    },
    root: {
        height: "100vh",
        position: "relative"
    },
    haederBackground: {
        height: "300px",
        width: "150%",
        background: "linear-gradient(44.78deg, #07889B -14.33%, #66B9BF 60.38%, #FF9AF5 117.11%)",
        borderRadius: "60%",
        marginTop: "-300px",
        marginLeft: "-120px",
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
        fontSize: "45px",
        marginTop: "10%",
        marginBottom: "auto",

    },
    date:{
        fontSize: "20px",
    }, 
    formContainer: {
        width: "100%",
        marginTop: "10%",
        marginLeft: "10%"
    },
})
const Post = () => {
    const classes = useStyles();

    let content = (
        <div className={classes.formWrapper}>
            <div className={classes.root}>
                <div className={classes.header}></div>
                <div className={classes.subject}>
                    <h1 className={classes.welcome}>Post Subject</h1>
                    <h2 className={classes.date}>01/01/2020</h2>
                    </div>
                <div className={classes.haederBackground} />
                
            </div>
        </div>
    )

    return content;
}

export default Post;

