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
import { Link } from 'react-router-dom';
import TimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en'


function Home() {

    const [state, dispatch] = useStateValue();
    const [data, setData] = useState([]);
    const [comment, setComment] = useState("");
    var currentdate = new Date();
    // TimeAgo.addDefaultLocale(en)
    // const timeAgo = new TimeAgo('en-US')
    // console.log("Data(Date Testing):-", timeAgo)

    useEffect(() => {
        fetch('/allpost', {
            header: {
                "Authorization" : "Bearer " + localStorage.getItem("jwt")
            }
        }).then(res => res.json())
            .then(result => {
                setData(result.post)
                // console.log("All Post:-", result.post)
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

    const makeComment = (text,postId)=>{
          fetch('/comment',{
              method:"put",
              headers:{
                  "Content-Type":"application/json",
                  "Authorization":"Bearer "+localStorage.getItem("jwt")
              },
              body:JSON.stringify({
                  postId,
                  text
              })
          }).then(res=>res.json())
          .then(result=>{
              console.log(result)
              const newData = data.map(item=>{
                if(item._id==result._id){
                    return result
                }else{
                    return item
                }
             })
            setData(newData)
          }).catch(err=>{
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
                const newData = data.filter(item => {
                    return item._id !== result.result._id
                })
                // console.log(newData)
                setData(newData)
            }).catch(err => {
                console.log("Error from front-end:-", err)
        })
    }
    console.log("State:-", state.user._id)

    console.log("Data:-", data)
    return (
        <div className="home">
            {data.map(item => {
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
                                        {
                                            item.comments.map(record=>{
                                                return (   
                                                    <div className="comment">
                                                        <h4 key={record._id}>{record.postedBy.name}</h4>
                                                        <p>{record.text}</p>
                                                    </div>
                                                )
                                            })
                                        }
                                    </div>
                                    <p>{item.createdAt && (item.createdAt.split("T")[0])}</p>
                                </div>
                            </div>
                            <div className="home__addComment">
                                <form onSubmit={(e) => {
                                    e.preventDefault()
                                    makeComment(e.target[0].value, item._id)
                                }}>
                                    <input
                                        placeholder="Add a comment"
                                        type="text"
                                    />
                                    {/* <button>Post</button> */}
                                </form>
                            </div>
                        </div>
                    )
                })
            }
        </div>
    )
}

export default Home
