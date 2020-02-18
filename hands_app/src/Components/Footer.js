import React from 'react'
import FacebookIcon from '@material-ui/icons/Facebook';
import TwitterIcon from '@material-ui/icons/Twitter';
import PinterestIcon from '@material-ui/icons/Pinterest';
import YouTubeIcon from '@material-ui/icons/YouTube';
import CopyrightIcon from '@material-ui/icons/Copyright';
import { makeStyles } from "@material-ui/core/styles";
import logo from '../logo/logo.png';
const useStyles = makeStyles({
    footerContainer: {
        height:"10vh"
    },
    topRow:{
        height:"70%",
        display:"flex",
        justifyContent:"space-between",
        color:"white",
        background: "#212121",
    },
    leftSide:{
        width: "40%",
        display:"flex",
        justifyContent:"baseline"
    },
    rightSide:{
        display:"flex",
        alignItems:"center",
        marginRight:"5%"
    },
    logo:{
        marginLeft:"5%",
        width:"15%"
    },
    icons:{
        width:"25%",
        display:"flex",
        alignItems:"center",
        marginLeft:"2%",
        justifyContent:"space-evenly"
    },
    bottomRow:{
        height:"30%",
        background:"black",
        color:"white"
    }

})

function Footer() {
    const classes = useStyles();
    return (
        <div className={classes.footerContainer}>
            <div className={classes.topRow}>
                <div className={classes.leftSide}>
                    <img src={logo} className={classes.logo} alt="logo"/>
                    <div className={classes.icons}><FacebookIcon /><TwitterIcon /><YouTubeIcon /><PinterestIcon /></div>
                </div>
                <div className={classes.rightSide}>Contact Us</div>
            </div>
            <div className={classes.bottomRow}>
                <div><CopyrightIcon/> All Right Reserved | Avital Kahani and Chen Gutman 2019</div>
            </div>
        </div>
    )
}

export default Footer
