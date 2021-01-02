import React, { useEffect, useState } from 'react';
import './SubscribedPost.css';
import Avatar from '@material-ui/core/Avatar';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import ChatRoundedIcon from '@material-ui/icons/ChatRounded';
import SendIcon from '@material-ui/icons/Send';
import BookmarkBorderRoundedIcon from '@material-ui/icons/BookmarkBorderRounded';
import ThumbDownIcon from '@material-ui/icons/ThumbDown';
import { Link } from 'react-router-dom';
import { useStateValue } from '../../../reducers/StateProvider';

function SubscribedPost() {

    const [state, dispatch] = useStateValue();
    const [subPost, setSubPost] = useState([]);
    const [comment, setComment] = useState("");

    // console.log("State From Home:-", state)

    useEffect(() => {
        getPost()
    }, [])
    
    // console.log(data)

    const getPost = () => {
        fetch('/followpost', {
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("jwt")
            }
        }).then(res => res.json())
            .then(result => {
                setSubPost(result.posts)
        })
    }

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
                const newData = subPost.map(item => {
                    if (item._id == id) {
                        return result
                    } else {
                        return item
                    }
                })
                setSubPost(newData)
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
                const newData = subPost.map(item => {
                    if (item._id == id) {
                        return result
                    } else {
                        return item
                    }
                })
                setSubPost(newData)
            }).catch(err => {
                console.log("Error:-", err)
        })
    }

    const makeComment = (text, id) => {
        // e.preventDefault()
        console.log("comment from state:-", text)
        fetch('/comment', {
            method: "put",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("jwt")
            },
            body: JSON.stringify({
                text,
                postId : id,
            })
        }).then(res => res.json())
            .then(result => {
                // setData(result)
                
            }).catch(err => {
                console.log("Error from front-end:-", err)
        })
    }

    const deletePost = (postId) => {
        console.log("I am clicked by:-", postId)
        fetch(`/delete/${postId}`, {
            method: "delete",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("jwt")
            },
        }).then(res => res.json())
            .then(result => {
                // setData(result)
                console.log("result", result.result._id)
                const newData = subPost.filter(item => {
                    return item._id !== result.result._id
                })
                // console.log(newData)
                setSubPost(newData)
            }).catch(err => {
                console.log("Error from front-end:-", err)
        })
    }
    console.log("State:-", state)

    console.log("Data:-", subPost)
    return (
        <div className="home">
            {subPost.map(item => {
                    return (
                        <div className="home__post">
                            <div className="home__displayInfo">
                                <div className="display__info">
                                    <Avatar /> 
                                    {/* <Link to= {`/profile/${item.postedBy._id}`}> */}
                                    <Link to={item.postedBy._id !== state.user.id ? "/profile/" + item.postedBy._id : "/profile"} style={{ marginLeft: "20px", textDecoration: "none", color:"black"}} >
                                        <h4>{item.postedBy.name}</h4>
                                    </Link>
                                </div>
                                <div className="displayInfo__more" >
                                    {item.postedBy._id == state.user._id && <MoreHorizIcon onClick={() => deletePost(item._id)}/>}
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
                                <form onSubmit={(e) => {
                                    e.preventDefault()
                                    makeComment(e.target[0].value, item._id)
                                }}>
                                    <input
                                        type="text"
                                        // value={comment}
                                        placeholder="Add a comment"
                                        // onChange={(e) => setComment(e.target.value)}
                                    />
                                    <button>Post</button>
                                </form>
                            </div>
                        </div>
                    )
                })
            }
        </div>
    )
}

export default SubscribedPost
