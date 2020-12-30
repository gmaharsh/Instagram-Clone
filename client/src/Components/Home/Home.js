import React, { useEffect, useState } from 'react';
import './Home.css';
import Avatar from '@material-ui/core/Avatar';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import ChatRoundedIcon from '@material-ui/icons/ChatRounded';
import SendIcon from '@material-ui/icons/Send';
import BookmarkBorderRoundedIcon from '@material-ui/icons/BookmarkBorderRounded';
import { useStateValue } from '../../reducers/StateProvider';

function Home() {

    const [state, dispatch] = useStateValue();
    const [data, setData] = useState([]);

    console.log("State From Home:-", state)

    useEffect(() => {
        fetch('/allpost', {
            header: {
                "Authorization" : "Bearer " + localStorage.getItem("jwt")
            }
        }).then(res => res.json())
            .then(result => {
                setData(result.post)
        })
    }, [])
    
    console.log(data)

    return (
        <div className="home">
            {data.map(item => {
                    return (
                        <div className="home__post">
                            <div className="home__displayInfo">
                                <div className="display__info">
                                    <Avatar /> 
                                    <h4>{item.postedBy.name}</h4>
                                </div>
                                <div className="displayInfo__more">
                                    <MoreHorizIcon />
                                </div>
                            </div>
                            <div className="home__postImage">
                                <img
                                    src={item.image} alt=""
                                />
                            </div>
                            <div className="home__postInfo">
                                <div className="post__Analytics">
                                    <div className="post__AnalyticsLeft">
                                        <div className="post__AnalyticsLeftItem">
                                            <FavoriteBorderIcon fontSize="medium" />
                                        </div>
                                        <div className="post__AnalyticsLeftItem">
                                            <FavoriteBorderIcon fontSize="medium" />
                                        </div>
                                        <div className="post__AnalyticsLeftItem">
                                            <ChatRoundedIcon fontSize="medium" />
                                        </div>
                                        <div className="post__AnalyticsLeftItem">
                                            <SendIcon fontSize="medium" />
                                        </div>
                                    </div>
                                    <div className="post__AnalyticsRight">
                                        <BookmarkBorderRoundedIcon />
                                    </div>  
                                </div>
                                <div className="post__LikesComment">
                                    <h4>3,000 likes</h4>
                                    <div className="post__Comment">
                                        <h4>{item.postedBy.name}</h4>
                                        <p>{item.caption}</p>
                                    </div>
                                    <p>1 day ago</p>
                                </div>
                            </div>
                            <div className="home__addComment">
                                <div className="newComment">
                                    <input
                                        type="text"
                                        placeholder="Add a comment"
                                    />
                                </div>
                                <div className="postButton">
                                    <h4>Post</h4>
                                </div>
                            </div>
                        </div>
                    )
                })
            }
        </div>
    )
}

export default Home
