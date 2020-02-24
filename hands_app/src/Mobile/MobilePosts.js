import React, { useState, useEffect } from "react";
import PostThumbnail from "../Components/Post/PostThumbnail";
import GridList from "@material-ui/core/GridList";
import PostView from "../Components/Post/PostView";
import { makeStyles } from "@material-ui/core/styles";
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
        clipPath: "ellipse(90% 20% at 40% 0%)",
        background: "linear-gradient(44.78deg, #07889B -14.33%, #66B9BF 60.38%, #FF9AF5 160.11%)",
    },
    subject: {
        color: "white",
        marginLeft: "35px",
        position: "relative",
        fontSize: "24px",
        marginTop: "10%",
        zIndex: 100,
    },
    formContainer: {
        width: "100%",
        marginTop: "10%",
    },
    gridContainer: {
        height: "100%",
        display: "flex",
        flexWrap: "wrap",
        width: "100%",
    },
    gridList: {
        height: 550,
        justifyContent: "space-around",
        position: "absolute",
        bottom: "2%",
        '& .makeStyles-mobileRoot-32': {
            width: 120,
            height: 100,
            marginRight: "5px",
            marginLeft: "5px"
        }
    },
    card: {
        width: "40%"
    },
    topContainer: {
        position: "fixed",
    },
})

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


const MobilePosts = (props) => {
    const classes = useStyles();
    const [posts, setPosts] = useState([]);
    const [selectedPost, setSelectedPost] = useState({});
    const [selectedPostIndex, setSelectedPostIndex] = useState(-1);
    let content;

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
        setSelectedPost(makeSelectedPost);
    };

    const handlePostSelect = value => {
        setSelectedPostIndex(value);
        maketSelectedPostFunction(value);
    };

    useEffect(() => {
        setPosts(appPosts);
    }, []);
    if (selectedPostIndex === -1) {
        content = (
            <div className={classes.formWrapper}>
                <div className={classes.root}> </div>
                <div className={classes.topContainer}>
                    <div className={classes.header}></div>
                    <div className={classes.subject}><h1>Posts</h1></div>
                </div>
                    <div className={classes.gridContainer}>
                        <GridList cellHeight={180} className={classes.gridList}>
                            {posts.map((post, index) => {
                                return (
                                    <PostThumbnail
                                        className={classes.card}
                                        onSelect={handlePostSelect}
                                        postIndex={index}
                                        selectedPostI={selectedPostIndex}
                                        isMobile={true}
                                    />
                                );
                            })}
                        </GridList>
                </div>
            </div>
        )
    } else {
        content = (
            <div className={classes.formWrapper}>
                <div className={classes.root}> </div>
                <div className={classes.topContainer}>
                    <div className={classes.header}></div>
                </div>
                <div className={classes.postContainer}>
                 <PostView key={selectedPost._id} postContent={selectedPost} isMobile={true}/>
                </div>

            </div>
        )


    }


    return content;
}

export default MobilePosts

