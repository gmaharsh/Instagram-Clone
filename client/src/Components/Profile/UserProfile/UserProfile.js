import React, { useEffect, useState } from 'react';
import './UserProfile.css'; 
import SettingsIcon from '@material-ui/icons/Settings';
import { useParams } from 'react-router-dom';
import { useStateValue } from '../../../reducers/StateProvider';

const UserProfile = ()  => {

    const [userProfile, setuserProfile] = useState([]);
    const { userId } = useParams()
    const [state, dispatch] = useStateValue();

    console.log("userid:-", userId)

    useEffect(() => {
        fetch(`/user/${userId}`, {
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("jwt")
            }
        }).then(res => res.json())
            .then(result => {
                console.log("result:-", result)
                setuserProfile(result)
            })
    }, [])

    console.log("userProfile",userProfile)
    console.log("State:-",state.user)
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
                            <div className="profile__follow">
                                <h4>{userProfile.posts.length}<span>posts</span></h4>
                                <h4>1000 <span>followers</span></h4>
                                <h4>1000 <span>following</span></h4>
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