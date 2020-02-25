import React, { useState } from 'react'
import { makeStyles } from "@material-ui/core/styles";
import CreatePostForm from "../Components/Post/CreatePostForm";
import PostPhotos from "../Components/Post/PostPhotos";
const useStyles = makeStyles({
    formWrapper: {
        height: "90vh",
        position: "relative",
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
        width: "40%",
        height:"75vh",
        left: "40%",
        position: "absolute",
        top:"10%",
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
        paddingTop: "5%",
        fontWeight: "bold",
        fontSize: "36px",
    },
    welcomeMessage: {
        paddingTop: "20px",
        fontWeight: "normal",
        fontSize: "45px"
    }
})
export default function CreatePostPage(props) {
    const [request] = useState(props.location.state.request);
    const classes = useStyles();
    return (
        <div>
            <div className={classes.formWrapper}>
                <div className={classes.bgContainer}>
                    <div className={classes.leftColumn}>
                        <h1 className={` ${classes.welcome} ${classes.welcomeHeading} `}>Write a Post</h1>
                        <PostPhotos/>
                    </div>
                    <div className={classes.rightColumn}></div>
                </div>
                <div  className={classes.formContainer}><CreatePostForm requestDetails={request}/></div>
            </div>
        </div>
    );
}
