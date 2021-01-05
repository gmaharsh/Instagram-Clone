import React from 'react';
import './Header.css';
import HomeIcon from '@material-ui/icons/Home';
import MessageIcon from '@material-ui/icons/Message';
import ExploreIcon from '@material-ui/icons/Explore';
import FavoriteIcon from '@material-ui/icons/Favorite';
import Avatar from "@material-ui/core/Avatar";
import AddCircleIcon from '@material-ui/icons/AddCircle';
import { Link, useHistory } from 'react-router-dom';
import { actionTypes } from '../../reducers/userReducer';
import { useStateValue } from '../../reducers/StateProvider';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
// import { UserContext } from '../../App';
import PeopleIcon from '@material-ui/icons/People';



function Header() {
    
    const [{} , dispatch] = useStateValue()
    const history = useHistory();

    const signout = () => {
        console.log("I am clicked")
        localStorage.clear()
        dispatch({
            type: actionTypes.REMOVE_USER,
        })
        history.push("/login")
    }

    return (
        <div className="header">
            <Link to="/" style={{ color: "black",textDecoration:"none"}}>
                <div className="header__logo">
                    <h3>Instagram</h3>
                </div>
            </Link>
            <div className="header__search">
                <input
                    type="text"
                    placeholder="Search"
                />
            </div>
            <div className="header__items">
                {/* {renderList() */}
                <Link to="/myfollowersPost" style={{color:"black"}}>
                    <div className="header__item">
                        <PeopleIcon />
                    </div>
                </Link>
                <Link to="/post" style={{color:"black"}}>
                    <div className="header__item">
                        <AddCircleIcon />
                    </div>
                </Link>
                <Link to="/" style={{color:"black"}}>
                    <div className="header__item">
                        <HomeIcon />
                    </div>
                </Link>
                <div className="header__item">
                    <MessageIcon />
                </div>
                <div className="header__item">
                    <ExploreIcon />
                </div>
                <div className="header__item">
                    <FavoriteIcon />
                </div>
                <div className="header__item" onClick={signout}>
                    <ExitToAppIcon />
                </div>
                <Link to='/profile'>
                    <div className="header__item" >
                        <Avatar />
                    </div>
                </Link>
            </div>
        </div>
    )
}

export default Header
