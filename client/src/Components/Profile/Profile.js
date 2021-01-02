import React, { useEffect, useState } from 'react';
import './Profile.css'; 
import SettingsIcon from '@material-ui/icons/Settings';
import { useStateValue } from '../../reducers/StateProvider';

function Profile() {

    const [myPics, setMyPics] = useState([]);

    const [state, dispatch] = useStateValue();

    useEffect(() => {
        fetch('/mypost', {
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("jwt")
            }
        }).then(res => res.json())
            .then(result => {
                setMyPics(result.post)
        })
    }, [])

    // console.log(myPics)
    console.log("State:-",state)
    return (
        <div className="profile">
            <div className="profile__display">
                <div className="profile__image">
                    {state.user.profileImage ? <img src={state.user.profileImage} alt="" /> : <img src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png" alt=" " />}
                </div>
                <div className="profile__info">
                    <div className="profile__general">
                        <h4>{state ? state.user.name : "Lorem Ipsum"}</h4>
                        {/* <h4>Maharsh Hetal Gheewala</h4> */}
                        <button>Edit Profile</button>
                        <SettingsIcon />
                    </div>
                    <div className="profile__follow">
                        <h4>{myPics.length}<span>posts</span></h4>
                        <h4>{state ? state.user.followers.length :  "0"}<span>followers</span></h4>
                        <h4>{state ? state.user.following.length : "0"}<span>following</span></h4>
                    </div>
                </div>
            </div>
            <div className="profile__posts">
                {myPics.map((picture) => {
                    return (
                        <img key={picture._id} src={picture.image} alt="" />
                    )
                })}
                
            </div>
        </div>
    )
}

export default Profile
