import React, { useEffect, useState } from 'react';
import './UserProfile.css'; 
import SettingsIcon from '@material-ui/icons/Settings';
import { useParams } from 'react-router-dom';
import { useStateValue } from '../../../reducers/StateProvider';

const UserProfile = ()  => {
    const [state, dispatch] = useStateValue();
    const [userProfile, setuserProfile] = useState([]);
    const { userId } = useParams()
    const [showFollowButton, setShowFollowButton] = useState(true);
    
    // console.log("userid:-", userId)

    useEffect(() => {
        fetch(`/user/${userId}`, {
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("jwt")
            }
        }).then(res => res.json())
            .then(result => {
                // console.log("result:-", result)
                setuserProfile(result)
            })
    }, [])

    const followUser = () => {
        fetch('/follow', {
            method: "put",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("jwt")
            }, body: JSON.stringify({
                followId: userId
            })
        }).then(res => res.json())
            .then(result => {
                dispatch({
                    type: "UPDATE",
                    payload: {
                        following: result.following,
                        followers : result.followers
                    }
                })
                
                setuserProfile((prevstate) => {
                    return {
                        ...prevstate,
                        user: {
                            ...prevstate.user,
                            followers:[...prevstate.user.followers, result._id]
                        }
                    }
                })
           
            })  
        setShowFollowButton(false)
    }

    console.log("showFollow:-", showFollowButton)

    const UnfollowUser = () => {
        fetch('/unfollow', {
            method: "put",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("jwt")
            }, body: JSON.stringify({
                followId: userId
            })
        }).then(res => res.json())
            .then(result => {
                console.log("result of following", result)
                dispatch({
                    type: "UPDATE",
                    payload: {
                        following: result.following,
                        followers : result.followers
                    }
                })
                setuserProfile((prevstate) => {
                    // console.log("Previous State:-", prevstate)
                    const newFollower = prevstate.user.followers.filter(item => item !== result._id);
                    return {
                        ...prevstate,
                        user: {
                            ...prevstate.user,
                            followers:newFollower
                        }
                    }
                })
            })
        setShowFollowButton(true)
    }

    // console.log("userProfile",userProfile)
    console.log("State:-",state)
    return (
        <>
            {userProfile.user ?
                <div className="profile">
                    <div className="profile__display">
                        <div className="profile__image">
                            <img src="https://instagram.ford4-1.fna.fbcdn.net/v/t51.2885-19/s150x150/123120705_989638364859600_8753336163012595414_n.jpg?_nc_ht=instagram.ford4-1.fna.fbcdn.net&_nc_ohc=HeQBC5kgX4QAX83-VJY&tp=1&oh=516dd7cfbb98d0354cbd98bbfe28bed6&oe=60156678" alt="" />
                        </div>
                        <div className="profile__info">
                            <div className="profile__general">
                                    <h4>{userProfile.user.name}</h4>
                                <button>Message</button>
                                <SettingsIcon />
                            </div>
                            <div className="profile__stats">
                                <h4>{userProfile.posts.length}<span>posts</span></h4>
                                <h4>{userProfile.user.followers.length} <span>followers</span></h4>
                                <h4>{userProfile.user.following.length} <span>following</span></h4>
                            </div>
                            <div className="profile__follow-following">
                                {showFollowButton ? 
                                <button onClick={() => followUser()}>Follow</button>: 
                                <button onClick={() => UnfollowUser()}>UnFollow</button>}
                            </div>
                        </div>
                    </div>
                    <div className="profile__posts">
                        {userProfile.posts.map((picture) => {
                            return (
                                <img key={picture._id} src={picture.image} alt="" />
                            )
                        })}
                    </div>
                </div>
                : <div>
                    <h1>I am loading</h1>
                </div>}
        </>
    )
}

export default UserProfile;
