import React from 'react';
import FacebookIcon from '@material-ui/icons/Facebook';
import TwitterIcon from '@material-ui/icons/Twitter';
import PinterestIcon from '@material-ui/icons/Pinterest';
import YouTubeIcon from '@material-ui/icons/YouTube';
import CopyrightIcon from '@material-ui/icons/Copyright';
import { makeStyles } from "@material-ui/core/styles";
import useMediaQuery from '@material-ui/core/useMediaQuery';
import HomeOutlinedIcon from '@material-ui/icons/HomeOutlined';
import SearchOutlinedIcon from '@material-ui/icons/SearchOutlined';
import LocationOnOutlinedIcon from '@material-ui/icons/LocationOnOutlined';
import { IconButton } from '@material-ui/core';
import { Link as RouterLink } from "react-router-dom";
import logo from '../images/logo.png';

const useStyles = makeStyles({
    footerContainer: {
        height: "10vh",
    },
    topRow: {
        height: "70%",
        display: "flex",
        justifyContent: "space-between",
        color: "white",
        background: "#212121",
    },
    leftSide: {
        width: "40%",
        display: "flex",
        justifyContent: "baseline"
    },
    rightSide: {
        display: "flex",
        alignItems: "center",
        marginRight: "5%"
    },
    logo: {
        marginLeft: "5%",
        width: "15%"
    },
    icons: {
        width: "25%",
        display: "flex",
        alignItems: "center",
        marginLeft: "2%",
        justifyContent: "space-evenly"
    },
    bottomRow: {
        height: "30%",
        background: "black",
        color: "white"
    },
    bottomRowContent: {
        display: "flex",
        alignItems: "center",
    },
    /*Mobile Footer*/
    mobileFooter: {
        position: "absolute",
        width: "100%",
        height: "66px",
        backgroundColor: "#F0F5F7",
        left: 0,
        bottom: 0
    },
    IconContainer: {
        display: "flex",
        justifyContent: "space-around",
        marginTop: "5%",
        '& .MuiIconButton-root': {
            padding: "0px",
            color: "black"
        }

    },
    mobileIcons: {
        fontSize: "2rem",
    }

})
function Footer(props) {
    const classes = useStyles();
    const matches = useMediaQuery('(min-width:415px)');
    if (matches === true) {
        return (
            <div className={classes.footerContainer}>
                <div className={classes.topRow}>
                    <div className={classes.leftSide}>
                        <img src={logo} className={classes.logo} alt="logo" />
                        <div className={classes.icons}><FacebookIcon style={{color:"#272eae"}}/><TwitterIcon style={{backgroundColor:"#1590d8",fontSize:"15px",borderRadius:"50%",padding:"4px"}}/><YouTubeIcon style={{backgroundColor:"#D0021B",fontSize:"15px",borderRadius:"50%",padding:"4px"}}/><PinterestIcon style={{color:"#f53e6a"}}/></div>
                    </div>
                    <div className={classes.rightSide}>Contact Us</div>
                </div>
                <div className={classes.bottomRow}>
                    <div className={classes.bottomRowContent}><CopyrightIcon /> All Right Reserved | Avital Kahani and Chen Gutman 2019</div>
                </div>
            </div>
        )
    } else {
        if (props.location === "/" || props.location === "/connection/login") {
            return null;
        }
        else {
            return (
                <div className={classes.mobileFooter}>
                    <div className={classes.IconContainer}>
                        <IconButton onClick={props.onHomeClick} variant="contained" component={RouterLink}
                            to={{
                                pathname: "/posts",
                            }}
                        >
                            <HomeOutlinedIcon className={classes.mobileIcons} />
                        </IconButton>
                        <SearchOutlinedIcon className={classes.mobileIcons} />
                        <IconButton variant="contained" component={RouterLink}
                            to={{
                                pathname: "/Map",
                            }}>
                            <LocationOnOutlinedIcon className={classes.mobileIcons} />
                        </IconButton>
                    </div>
                </div>
            )
        }


    }
}

export default Footer
