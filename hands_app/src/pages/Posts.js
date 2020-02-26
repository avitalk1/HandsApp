import React, { useState, useEffect } from "react";
//import "./styles.css";
import axios from "axios";
import GridList from "@material-ui/core/GridList";
import { makeStyles } from "@material-ui/core/styles";
import PostView from "../Components/Post/PostView";
import PostThumbnail from "../Components/Post/PostThumbnail";
import { Typography } from "@material-ui/core";
const appPosts = [
  {
    selected_dates: {
      from: "2020-02-03",
      to: "2020-02-04"
    },

    _id: 1,
    request: {
      subject: "First Request",
      location: {
        street: {
          name: "Bruria",
          number: 5
        },
        entrance: "B",
        apt_number: 6,
        city: "Ramat-Gan",
        floor: 4
      },
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
    },
    costum_description: {
      changed: false,
      description: "First Request Costume Description"
    },
    number_of_volunteers: {
      joined: 0,
      need: 5
    },
    professions: [
      {
        _id: "5e2f0a31627eff0017da3fef",
        profession: "None",
        number_needed: 4
      },
      {
        _id: "5e2f0a31627eff0017da3fee",
        profession: "Plumber",
        number_needed: 16
      },
      {
        _id: "5e2f0a31627eff0017da3fee",
        profession: "Plumber",
        number_needed: 16
      },
      {
        _id: "5e2f0a31627eff0017da3fee",
        profession: "Plumber",
        number_needed: 16
      },
      {
        _id: "5e2f0a31627eff0017da3fee",
        profession: "Plumber",
        number_needed: 16
      },
    ]
  },
  {
    selected_dates: {
      from: "2020-02-03",
      to: "2020-02-04"
    },
    _id: 2,
    request: {
      subject: "Second Request",
      location: {
        street: {
          name: "Bruria",
          number: 5
        },
        entrance: "B",
        apt_number: 6,
        city: "Ramat-Gan",
        floor: 4
      },
      description: "First Request Description ..."
    },
    costum_description: {
      changed: false,
      description: "First Request Costume Description"
    },
    number_of_volunteers: {
      joined: 0,
      need: 5
    },
    professions: [
      {
        _id: "5e2f0a31627eff0017da3fef",
        profession: "None",
        number_needed: 4
      },
      {
        _id: "5e2f0a31627eff0017da3fee",
        profession: "Plumber",
        number_needed: 16
      }
    ]
  },
  {
    selected_dates: {
      from: "2020-02-03",
      to: "2020-02-04"
    },
    _id: 3,
    request: {
      subject: "Third Request",
      location: {
        street: {
          name: "Bruria",
          number: 5
        },
        entrance: "B",
        apt_number: 6,
        city: "Ramat-Gan",
        floor: 4
      },
      description: "First Request Description ..."
    },
    costum_description: {
      changed: true,
      description: "First Request Costume Description"
    },
    number_of_volunteers: {
      joined: 0,
      need: 5
    },
    professions: [
      {
        _id: "5e2f0a31627eff0017da3fef",
        profession: "None",
        number_needed: 4
      },
      {
        _id: "5e2f0a31627eff0017da3fee",
        profession: "Plumber",
        number_needed: 16
      }
    ]
  },
  {
    selected_dates: {
      from: "2020-02-03",
      to: "2020-02-04"
    },
    _id: 4,
    request: {
      subject: "Fourth Request",
      location: {
        street: {
          name: "Bruria",
          number: 5
        },
        entrance: "B",
        apt_number: 6,
        city: "Ramat-Gan",
        floor: 4
      },
      description: "First Request Description ..."
    },
    costum_description: {
      changed: false,
      description: "First Request Costume Description"
    },
    number_of_volunteers: {
      joined: 0,
      need: 5
    },
    professions: [
      {
        _id: "5e2f0a31627eff0017da3fef",
        profession: "None",
        number_needed: 4
      },
      {
        _id: "5e2f0a31627eff0017da3fee",
        profession: "Plumber",
        number_needed: 16
      }
    ]
  },
  {
    selected_dates: {
      from: "2020-02-03",
      to: "2020-02-04"
    },
    _id: 5,
    request: {
      subject: "Fifth Request",
      location: {
        street: {
          name: "Bruria",
          number: 5
        },
        entrance: "B",
        apt_number: 6,
        city: "Ramat-Gan",
        floor: 4
      },
      description: "First Request Description ..."
    },
    costum_description: {
      changed: true,
      description: "First Request Costume Description"
    },
    number_of_volunteers: {
      joined: 0,
      need: 5
    },
    professions: [
      {
        _id: "5e2f0a31627eff0017da3fef",
        profession: "None",
        number_needed: 4
      },
      {
        _id: "5e2f0a31627eff0017da3fee",
        profession: "Plumber",
        number_needed: 16
      }
    ]
  },
  {
    selected_dates: {
      from: "2020-02-03",
      to: "2020-02-04"
    },
    _id: 6,
    request: {
      subject: "Sixth Request",
      location: {
        street: {
          name: "Bruria",
          number: 5
        },
        entrance: "B",
        apt_number: 6,
        city: "Ramat-Gan",
        floor: 4
      },
      description: "First Request Description ..."
    },
    costum_description: {
      changed: true,
      description: "First Request Costume Description"
    },
    number_of_volunteers: {
      joined: 0,
      need: 5
    },
    professions: [
      {
        _id: "5e2f0a31627eff0017da3fef",
        profession: "None",
        number_needed: 4
      },
      {
        _id: "5e2f0a31627eff0017da3fee",
        profession: "Plumber",
        number_needed: 16
      }
    ]
  },
  {
    selected_dates: {
      from: "2020-02-03",
      to: "2020-02-04"
    },
    _id: 7,
    request: {
      subject: "Seventh Request",
      location: {
        street: {
          name: "Bruria",
          number: 5
        },
        entrance: "B",
        apt_number: 6,
        city: "Ramat-Gan",
        floor: 4
      },
      description: "First Request Description ..."
    },
    costum_description: {
      changed: true,
      description: "First Request Costume Description"
    },
    number_of_volunteers: {
      joined: 0,
      need: 5
    },
    professions: [
      {
        _id: "5e2f0a31627eff0017da3fef",
        profession: "None",
        number_needed: 4
      },
      {
        _id: "5e2f0a31627eff0017da3fee",
        profession: "Plumber",
        number_needed: 16
      }
    ]
  },
  {
    selected_dates: {
      from: "2020-02-03",
      to: "2020-02-04"
    },
    _id: 8,
    request: {
      subject: "Eighth Request",
      location: {
        street: {
          name: "Bruria",
          number: 5
        },
        entrance: "B",
        apt_number: 6,
        city: "Ramat-Gan",
        floor: 4
      },
      description: "First Request Description ..."
    },
    costum_description: {
      changed: true,
      description: "First Request Costume Description"
    },
    number_of_volunteers: {
      joined: 0,
      need: 5
    },
    professions: [
      {
        _id: "5e2f0a31627eff0017da3fef",
        profession: "None",
        number_needed: 4
      },
      {
        _id: "5e2f0a31627eff0017da3fee",
        profession: "Plumber",
        number_needed: 16
      }
    ]
  },
  {
    selected_dates: {
      from: "2020-02-03",
      to: "2020-02-04"
    },
    _id: 9,
    request: {
      subject: "Nineth Request",
      location: {
        street: {
          name: "Bruria",
          number: 5
        },
        entrance: "B",
        apt_number: 6,
        city: "Ramat-Gan",
        floor: 4
      },
      description: "First Request Description ..."
    },
    costum_description: {
      changed: false,
      description: "First Request Costume Description"
    },
    number_of_volunteers: {
      joined: 0,
      need: 5
    },
    professions: [
      {
        _id: "5e2f0a31627eff0017da3fef",
        profession: "None",
        number_needed: 4
      },
      {
        _id: "5e2f0a31627eff0017da3fee",
        profession: "Plumber",
        number_needed: 16
      }
    ]
  },
  {
    selected_dates: {
      from: "2020-02-03",
      to: "2020-02-04"
    },
    _id: 10,
    request: {
      subject: "Thenth Request",
      location: {
        street: {
          name: "Bruria",
          number: 5
        },
        entrance: "B",
        apt_number: 6,
        city: "Ramat-Gan",
        floor: 4
      },
      description: "First Request Description ..."
    },
    costum_description: {
      changed: true,
      description: "First Request Costume Description"
    },
    number_of_volunteers: {
      joined: 0,
      need: 5
    },
    professions: [
      {
        _id: "5e2f0a31627eff0017da3fef",
        profession: "None",
        number_needed: 4
      },
      {
        _id: "5e2f0a31627eff0017da3fee",
        profession: "Plumber",
        number_needed: 16
      }
    ]
  },
  {
    selected_dates: {
      from: "2020-02-03",
      to: "2020-02-04"
    },
    _id: 11,
    request: {
      subject: "Eleventh Request",
      location: {
        street: {
          name: "Bruria",
          number: 5
        },
        entrance: "B",
        apt_number: 6,
        city: "Ramat-Gan",
        floor: 4
      },
      description: "First Request Description ..."
    },
    costum_description: {
      changed: true,
      description: "First Request Costume Description"
    },
    number_of_volunteers: {
      joined: 0,
      need: 5
    },
    professions: [
      {
        _id: "5e2f0a31627eff0017da3fef",
        profession: "None",
        number_needed: 4
      },
      {
        _id: "5e2f0a31627eff0017da3fee",
        profession: "Plumber",
        number_needed: 16
      }
    ]
  },
  {
    selected_dates: {
      from: "2020-02-03",
      to: "2020-02-04"
    },
    _id: 12,
    request: {
      subject: "12th Request",
      location: {
        street: {
          name: "Bruria",
          number: 5
        },
        entrance: "B",
        apt_number: 6,
        city: "Ramat-Gan",
        floor: 4
      },
      description: "First Request Description ..."
    },
    costum_description: {
      changed: true,
      description: "First Request Costume Description"
    },
    number_of_volunteers: {
      joined: 0,
      need: 5
    },
    professions: [
      {
        _id: "5e2f0a31627eff0017da3fef",
        profession: "None",
        number_needed: 4
      },
      {
        _id: "5e2f0a31627eff0017da3fee",
        profession: "Plumber",
        number_needed: 16
      }
    ]
  },
  {
    selected_dates: {
      from: "2020-02-03",
      to: "2020-02-04"
    },
    _id: 13,
    request: {
      subject: "13th Request",
      location: {
        street: {
          name: "Bruria",
          number: 5
        },
        entrance: "B",
        apt_number: 6,
        city: "Ramat-Gan",
        floor: 4
      },
      description: "First Request Description ..."
    },
    costum_description: {
      changed: true,
      description: "First Request Costume Description"
    },
    number_of_volunteers: {
      joined: 0,
      need: 5
    },
    professions: [
      {
        _id: "5e2f0a31627eff0017da3fef",
        profession: "None",
        number_needed: 4
      },
      {
        _id: "5e2f0a31627eff0017da3fee",
        profession: "Plumber",
        number_needed: 16
      }
    ]
  },
  {
    selected_dates: {
      from: "2020-02-03",
      to: "2020-02-04"
    },
    _id: 14,
    request: {
      subject: "14th Request",
      location: {
        street: {
          name: "Bruria",
          number: 5
        },
        entrance: "B",
        apt_number: 6,
        city: "Ramat-Gan",
        floor: 4
      },
      description: "First Request Description ..."
    },
    costum_description: {
      changed: true,
      description: "First Request Costume Description"
    },
    number_of_volunteers: {
      joined: 0,
      need: 5
    },
    professions: [
      {
        _id: "5e2f0a31627eff0017da3fef",
        profession: "None",
        number_needed: 4
      },
      {
        _id: "5e2f0a31627eff0017da3fee",
        profession: "Plumber",
        number_needed: 16
      }
    ]
  },
  {
    selected_dates: {
      from: "2020-02-03",
      to: "2020-02-04"
    },
    _id: 15,
    request: {
      subject: "15th Request",
      location: {
        street: {
          name: "Bruria",
          number: 5
        },
        entrance: "B",
        apt_number: 6,
        city: "Ramat-Gan",
        floor: 4
      },
      description: "First Request Description ..."
    },
    costum_description: {
      changed: true,
      description: "First Request Costume Description"
    },
    number_of_volunteers: {
      joined: 0,
      need: 5
    },
    professions: [
      {
        _id: "5e2f0a31627eff0017da3fef",
        profession: "None",
        number_needed: 4
      },
      {
        _id: "5e2f0a31627eff0017da3fee",
        profession: "Plumber",
        number_needed: 16
      }
    ]
  },
  {
    selected_dates: {
      from: "2020-02-03",
      to: "2020-02-04"
    },
    _id: 16,
    request: {
      subject: "16th Request",
      location: {
        street: {
          name: "Bruria",
          number: 5
        },
        entrance: "B",
        apt_number: 6,
        city: "Ramat-Gan",
        floor: 4
      },
      description: "First Request Description ..."
    },
    costum_description: {
      changed: true,
      description: "First Request Costume Description"
    },
    number_of_volunteers: {
      joined: 0,
      need: 5
    },
    professions: [
      {
        _id: "5e2f0a31627eff0017da3fef",
        profession: "None",
        number_needed: 4
      },
      {
        _id: "5e2f0a31627eff0017da3fee",
        profession: "Plumber",
        number_needed: 16
      }
    ]
  },
  {
    selected_dates: {
      from: "2020-02-03",
      to: "2020-02-04"
    },
    _id: 17,
    request: {
      subject: "17th Request",
      location: {
        street: {
          name: "Bruria",
          number: 5
        },
        entrance: "B",
        apt_number: 6,
        city: "Ramat-Gan",
        floor: 4
      },
      description: "First Request Description ..."
    },
    costum_description: {
      changed: true,
      description: "First Request Costume Description"
    },
    number_of_volunteers: {
      joined: 0,
      need: 5
    },
    professions: [
      {
        _id: "5e2f0a31627eff0017da3fef",
        profession: "None",
        number_needed: 4
      },
      {
        _id: "5e2f0a31627eff0017da3fee",
        profession: "Plumber",
        number_needed: 16
      }
    ]
  },
  {
    selected_dates: {
      from: "2020-02-03",
      to: "2020-02-04"
    },
    _id: 18,
    request: {
      subject: "18th Request",
      location: {
        street: {
          name: "Bruria",
          number: 5
        },
        entrance: "B",
        apt_number: 6,
        city: "Ramat-Gan",
        floor: 4
      },
      description: "First Request Description ..."
    },
    costum_description: {
      changed: true,
      description: "First Request Costume Description"
    },
    number_of_volunteers: {
      joined: 0,
      need: 5
    },
    professions: [
      {
        _id: "5e2f0a31627eff0017da3fef",
        profession: "None",
        number_needed: 4
      },
      {
        _id: "5e2f0a31627eff0017da3fee",
        profession: "Plumber",
        number_needed: 16
      }
    ]
  },
  {
    selected_dates: {
      from: "2020-02-03",
      to: "2020-02-04"
    },
    _id: 19,
    request: {
      subject: "19th Request",
      location: {
        street: {
          name: "Bruria",
          number: 5
        },
        entrance: "B",
        apt_number: 6,
        city: "Ramat-Gan",
        floor: 4
      },
      description: "First Request Description ..."
    },
    costum_description: {
      changed: true,
      description: "First Request Costume Description"
    },
    number_of_volunteers: {
      joined: 0,
      need: 5
    },
    professions: [
      {
        _id: "5e2f0a31627eff0017da3fef",
        profession: "None",
        number_needed: 4
      },
      {
        _id: "5e2f0a31627eff0017da3fee",
        profession: "Plumber",
        number_needed: 16
      }
    ]
  }
];

const useStyles = makeStyles({
  root: {
    // position: "relative",
    // top: "10%",
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
