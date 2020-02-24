import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import PostView from "../Components/Post/PostView";
import ShowMap from '../Components/Map/ShowMap';
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
        position: "fixed",
        height: "100vh",
        marginTop: 0,
        width: "100%",
        clipPath: "ellipse(90% 22% at 40% 0%)",
        background: "linear-gradient(44.78deg, #07889B -14.33%, #66B9BF 60.38%, #FF9AF5 160.11%)",
        zIndex:100
    },
    subject: {
        color: "white",
        marginLeft: "35px",
        fontSize: "24px",
        marginTop: "5%",
        position: "relative",
    },
    formContainer: {
        width: "100%",
        marginTop: "10%",
        marginLeft: "10%"
    },
    MapContainer: {
    },
    Map:{
    },
    topContainer: {
        position: "fixed",
    }
})
const Maping = () => {
    const classes = useStyles();

    let content = (
        <div className={classes.formWrapper}>
            <div className={classes.root}> </div>
            <div className={classes.topContainer}>
                <div className={classes.header}></div>
                <div className={classes.subject}><h1>Happens Now</h1></div>
            </div>
            <div className={classes.MapContainer}>
                <div className={classes.Map}>
                    <ShowMap className={classes.Map}/>
                </div>
            </div>

        </div>
    )
    return content;
}

export default Maping;
