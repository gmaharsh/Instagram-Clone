import React, { useState } from 'react';
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
import { Menu, MenuItem } from '@material-ui/core';
import Fade from '@material-ui/core/Fade';


function Header() {
    
    const [state, dispatch] = useStateValue();
    const [search, setSearch] = useState("");
    const [userData, setUserData] = useState([]);
    const history = useHistory();

    const signout = () => {
        console.log("I am clicked")
        localStorage.clear()
        dispatch({
            type: actionTypes.REMOVE_USER,
        })
        history.push("/login")
    }

    const handleClick = (event) => {
        setSearch(event.currentTarget);
    };

    const handleClose = () => {
        setSearch(null);
    };

    // console.log(search)

    const fetchUsers = (query) => {
        setSearch(query)
        fetch('/search_users', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                
            },
            body: JSON.stringify({
                query
            })
        }).then(res => res.json())
                .then(results => {
                    console.log("results of search:-", results.user)
                    setUserData(results.user)
        })
    }
    console.log(userData)

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
                    onClick={handleClick}
                />
                <Menu
                    anchorEl={search}
                    keepMounted
                    open={Boolean(search)}
                    onClose={handleClose}
                    style={{width:"550px"}}
                    TransitionComponent={Fade}

                >   
                    <MenuItem value="profile" style={{top:"0",left:"30%" ,width:"30vh"}}>
                        <input
                            type="text"
                            placeholder="Search users"
                            onChange={(e) => fetchUsers(e.target.value)}
                        />

                    </MenuItem>
                    {userData.map(data => {
                        return (
                            <Link to={"/profile/" + data._id} style={{textDecoration: "none", color:"black"}} >
                                <MenuItem>{data.name}</MenuItem>
                            </Link>
                        )
                    })}
                </Menu>
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
