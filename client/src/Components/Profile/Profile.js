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

    console.log(myPics)
    console.log("State:-",state.user)
    return (
        <div className="profile">
            <div className="profile__display">
                <div className="profile__image">
                    <img src="https://instagram.ford4-1.fna.fbcdn.net/v/t51.2885-19/s150x150/123120705_989638364859600_8753336163012595414_n.jpg?_nc_ht=instagram.ford4-1.fna.fbcdn.net&_nc_ohc=HeQBC5kgX4QAX83-VJY&tp=1&oh=516dd7cfbb98d0354cbd98bbfe28bed6&oe=60156678" alt=""/>
                </div>
                <div className="profile__info">
                    <div className="profile__general">
                        <h4>{state ? state.user.name : "Lorem Ipsum"}</h4>
                        {/* <h4>Maharsh Hetal Gheewala</h4> */}
                        <button>Edit Profile</button>
                        <SettingsIcon />
                    </div>
                    <div className="profile__follow">
                        <h4>192<span>posts</span></h4>
                        <h4>1000 <span>followers</span></h4>
                        <h4>1000 <span>following</span></h4>
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
