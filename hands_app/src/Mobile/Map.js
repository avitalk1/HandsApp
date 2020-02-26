import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import ShowMap from '../Components/Map/ShowMap';
const useStyles = makeStyles({
    root: {
        position: "fixed",
        height: "100vh",
        marginTop: 0,
        width: "100%",
        clipPath: "ellipse(90% 20% at 40% 0%)",
        background: "linear-gradient(44.78deg, #07889B -14.33%, #66B9BF 60.38%, #FF9AF5 180.11%)",
    },
    subject: {
        color: "white",
        marginLeft: "35px",
        position: "absolute",
        fontSize: "24px",
        marginTop: "5%",
    },
})
const Maping = () => {
    const classes = useStyles();

    let content = (
        <div >
             <ShowMap/>
            <div className={classes.root}> </div>
            <div className={classes.subject}><h1>Happens Now</h1></div>
        </div>
    )
    return content;
}

export default Maping;

