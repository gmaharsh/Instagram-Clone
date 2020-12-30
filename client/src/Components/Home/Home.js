import React from 'react';
import './Home.css';
import Avatar from '@material-ui/core/Avatar';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import ChatRoundedIcon from '@material-ui/icons/ChatRounded';
import SendIcon from '@material-ui/icons/Send';
import BookmarkBorderRoundedIcon from '@material-ui/icons/BookmarkBorderRounded';

function Home() {
    return (
        <div className="home">
            <div className="home__post">
                <div className="home__displayInfo">
                    <div className="display__info">
                        <Avatar /> 
                        <h4>maharsh.gheewala</h4>
                    </div>
                    <div className="displayInfo__more">
                        <MoreHorizIcon />
                    </div>
                </div>
                <div className="home__postImage">
                    <img
                        src="https://images.unsplash.com/photo-1609024849543-ff59df361d08?ixid=MXwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwxNXx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60" alt=""
                    />
                </div>
                <div className="home__postInfo">
                    <div className="post__Analytics">
                        <div className="post__AnalyticsLeft">
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
                            <h4>maharsh.gheewala</h4>
                            <p>hello</p>
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
            <div className="home__post">
                <div className="home__displayInfo">
                    <div className="display__info">
                        <Avatar /> 
                        <h4>maharsh.gheewala</h4>
                    </div>
                    <div className="displayInfo__more">
                        <MoreHorizIcon />
                    </div>
                </div>
                <div className="home__postImage">
                    <img
                        src="https://images.unsplash.com/photo-1609024849543-ff59df361d08?ixid=MXwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwxNXx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60" alt=""
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
                            <h4>maharsh.gheewala</h4>
                            <p>hello</p>
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
        </div>
    )
}

export default Home
