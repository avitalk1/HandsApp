import React, { useState, useEffect } from "react";
import GridList from "@material-ui/core/GridList";
import { makeStyles } from "@material-ui/core/styles";
import PostView from "../Components/Post/PostView";
import PostThumbnail from "../Components/Post/PostThumbnail";
import { Typography } from "@material-ui/core";
import axios from "axios";

const useStyles = makeStyles({
  root: {
    display: "flex",
    background: "#F0F5F7",
    height: "90vh",
    justifyContent: "space-around"
  },
  gridContainer: {
    marginTop: "7%",
    paddingTop: "5px",
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
    overflow: "hidden",
    width: "70%",
    position:"relative"
  },
  gridList: {
    height: 550,
    justifyContent: "space-around",
    marginto: 5,
    position:"absolute",
    bottom:"4%"
  },
  postViewContainer: {
    background: "white",
    display: "flex",
    justifyContent: "center",
    width: "30%"
  },
  pageTitle: {
    position: "absolute",
    left: "6%",
    top: "8%",
    fontWeight: "bold",
    lineHeight: "56px",
    letterSpacing: "0.1em",
    fontSize: "2em",
    color: "#07889B"
  }
});

export default function Posts(props) {
  const classes = useStyles();
  const [posts, setPosts] = useState([]);
  const [selectedPost, setSelectedPost] = useState({});
  const [selectedPostIndex, setSelectedPostIndex] = useState(0);

  
  const fetchPosts = async () => {
    try{
      const results = await axios.get(`https://hands-app.herokuapp.com/post/showAllPosts`);
      setPosts(results.data)
    }catch(err){
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
    makeSelectedPost.id = posts[index]._id;
    makeSelectedPost.image = posts[index].request.images[posts[index].cover_photo];
    setSelectedPost(makeSelectedPost);
  };
  const handlePostSelect = value => {
    setSelectedPostIndex(value);
    maketSelectedPostFunction(value);
  };
  let content = (
    <div className={classes.root}>
      <Typography className={classes.pageTitle}>POST</Typography>

      <div className={classes.gridContainer}>
        <GridList cellHeight={180} className={classes.gridList}>
          {posts.map((post, index) => {
            return (
              <PostThumbnail
                onSelect={handlePostSelect}
                postIndex={index}
                key={post._id}
                title={post.request.subject}
                date={post.selected_dates.from}
                selectedPostI={selectedPostIndex}
                image={post.request.images[post.cover_photo]}
              />
            );
          })}
        </GridList>
      </div>
      <div className={classes.postViewContainer}>
        <PostView key={selectedPost.id} postContent={selectedPost} userId={props.location.state.userId} />
      </div>
    </div>
  );
  return content;
}
