import React, { useState, useEffect } from "react";
import PostThumbnail from "../Components/Post/PostThumbnail";
import GridList from "@material-ui/core/GridList";
import PostView from "../Components/Post/PostView";
import { makeStyles } from "@material-ui/core/styles";
import axios from "axios";

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
    gridList: {
        height: 570,
        justifyContent: "space-around",
        position: "absolute",
        bottom: "2%",

    },
    card: {
        width: "40%"
    }
})

const MobilePosts = (props) => {
    props.onPageLoad(window.location.pathname);
    const classes = useStyles();
    const [posts, setPosts] = useState([]);
    const [selectedPost, setSelectedPost] = useState({});
    const [selectedPostIndex, setSelectedPostIndex] = useState(-1);
    
    let content;
    const fetchPosts = async () => {
        try {
            const results = await axios.get(`https://hands-app.herokuapp.com/post/showAllPosts`);
            setPosts(results.data)
        } catch (err) {
            console.log(err);
        }

    }
    useEffect(() => {
        fetchPosts()
    }, []);
    useEffect(() => {
        if (posts.length !== 0) {
            maketSelectedPostFunction(0);
        }
    }, [posts]);
    

    const maketSelectedPostFunction = index => {
        let makeSelectedPost = {};
        window.history.pushState("", "", '/posts/post')
        makeSelectedPost.location = posts[index].request.location.city;
        makeSelectedPost.date = posts[index].selected_dates.from;
        makeSelectedPost.num_of_voulnteers = [
            posts[index].number_of_volunteers.joined,
            posts[index].number_of_volunteers.need
        ];

        if (posts[index].costum_description.changed) {
            makeSelectedPost.description =
                posts[index].costum_description.description;
        } else {
            makeSelectedPost.description = posts[index].request.description;
        }
        makeSelectedPost.professions = [];
        posts[index].professions.map((pro, index) => {
            makeSelectedPost.professions[index] = pro.profession;
        });
        makeSelectedPost.title = posts[index].request.subject;
        makeSelectedPost.image = posts[index].request.images[posts[index].cover_photo];
        setSelectedPost(makeSelectedPost);
    };

    const handlePostSelect = value => {
        setSelectedPostIndex(value);
        maketSelectedPostFunction(value);
    };
    useEffect(() => {
        setSelectedPostIndex(props.selectedIndex)
    }, [props.selectedIndex])

    if (selectedPostIndex < 0) {
        content = (
            <div >
                <div className={classes.root}> </div>
                <div className={classes.subject}><h1>Posts</h1></div>
                <GridList cellHeight={180} className={classes.gridList}>
                    {posts.map((post, index) => {
                        return (
                            <PostThumbnail
                                key={`postThumbnial${index}`}
                                className={classes.card}
                                onSelect={handlePostSelect}
                                postIndex={index}
                                selectedPostI={selectedPostIndex}
                                image={post.request.images[post.cover_photo]}
                                isMobile={true}
                            />
                        );
                    })}
                </GridList>
            </div>
        )
    } else {
        content = (
            <div>
                <div className={classes.root}> </div>
                <div className={classes.postContainer}>
                    <PostView key={selectedPost._id} postContent={selectedPost} isMobile={true} onJoin={()=>setSelectedPostIndex(-1)}/>
                </div>

            </div>
        )


    }


    return content;
}

export default MobilePosts

