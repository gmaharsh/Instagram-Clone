import React from 'react';
import './Header.css';
import HomeIcon from '@material-ui/icons/Home';
import MessageIcon from '@material-ui/icons/Message';
import ExploreIcon from '@material-ui/icons/Explore';
import FavoriteIcon from '@material-ui/icons/Favorite';
import Avatar from "@material-ui/core/Avatar";
import AddCircleIcon from '@material-ui/icons/AddCircle';
import { Link } from 'react-router-dom';
// import { UserContext } from '../../App';


function Header() {

    const signout = () => {
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
                    <Avatar />
                </div>
            </div>
        </div>
    )
}

export default Header
