import React, { useEffect, useState } from 'react';
import './Home.css';
import Avatar from '@material-ui/core/Avatar';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import ChatRoundedIcon from '@material-ui/icons/ChatRounded';
import SendIcon from '@material-ui/icons/Send';
import BookmarkBorderRoundedIcon from '@material-ui/icons/BookmarkBorderRounded';
import { useStateValue } from '../../reducers/StateProvider';
import ThumbDownIcon from '@material-ui/icons/ThumbDown';

function Home() {

    const [state, dispatch] = useStateValue();
    const [data, setData] = useState([]);

    // console.log("State From Home:-", state)

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
    
    // console.log(data)

    const likePost = (id) => {
        // console.log("id:-", id)
        fetch('/like', {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("jwt")
            },
            body: JSON.stringify({
                postId: id
            })
        }).then(res => res.json())
            .then(result => {
                const newData = data.map(item => {
                    if (item._id == id) {
                        return result
                    } else {
                        return item
                    }
                })
                setData(newData)
            }).catch(err => {
                console.log("Error:-", err)
        })
    }
    // console.log(data)

    const dislikePost = (id) => {
        // console.log("I am clicked by:-", id)
        fetch('/dislike', {
            method: "put",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("jwt")
            },
            body: JSON.stringify({
                postId: id
            })
        }).then(res => res.json())
            .then(result => {
                const newData = data.map(item => {
                    if (item._id == id) {
                        return result
                    } else {
                        return item
                    }
                })
                setData(newData)
            }).catch(err => {
                console.log("Error:-", err)
        })
    }
    // console.log("State:-", state.user._id)

    // console.log("Data:-", data)
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
                                        {item.likes.includes(state.user._id) ? <div className="post__AnalyticsLeftItem" onClick={() => dislikePost(item._id)}>
                                            <ThumbDownIcon  />
                                        </div> :
                                        <div className="post__AnalyticsLeftItem" onClick={() => likePost(item._id)}>
                                            <FavoriteBorderIcon  />
                                        </div>}
                                        <div className="post__AnalyticsLeftItem">
                                            <ChatRoundedIcon  />
                                        </div>
                                        <div className="post__AnalyticsLeftItem">
                                            <SendIcon  />
                                        </div>
                                    </div>
                                    <div className="post__AnalyticsRight">
                                        <BookmarkBorderRoundedIcon />
                                    </div>  
                                </div>
                                <div className="post__LikesComment">
                                    <h4>{item.likes.length} likes</h4>
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
