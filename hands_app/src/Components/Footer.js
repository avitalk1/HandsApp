import React from 'react'
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
import logo from '../images/logo.png';
const useStyles = makeStyles({
    footerContainer: {
        height:"10vh",
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
    },
    bottomRowContent:{
        display:"flex",
        alignItems:"center",
    },
    /*Mobile Footer*/ 
    mobileFooter:{
        position:"absolute",
        width:"100%",
        height:"66px",
        backgroundColor:"#F0F5F7",
        left:0,
        bottom:0
    },
    IconContainer:{
        display:"flex",
        justifyContent:"space-around",
        marginTop:"5%"
        
    },
    mobileIcons:{
        fontSize:"2rem",
        
    }

})

function Footer() {
    const classes = useStyles();
    const matches = useMediaQuery('(min-width:415px)');
  
    if(matches===true){
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
                    <div className={classes.bottomRowContent}><CopyrightIcon/> All Right Reserved | Avital Kahani and Chen Gutman 2019</div>
                </div>
            </div>
        )
    }else{
        return(
            <div className={classes.mobileFooter}>
                        <div className={classes.IconContainer}>
                            <HomeOutlinedIcon className={classes.mobileIcons}/>
                            <SearchOutlinedIcon className={classes.mobileIcons}/>
                            <LocationOnOutlinedIcon className={classes.mobileIcons}/>
                        </div>
            </div>
        )
    }
}

export default Footer
