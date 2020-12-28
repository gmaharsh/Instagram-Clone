import React from 'react';
import './Header.css';
import HomeIcon from '@material-ui/icons/Home';
import MessageIcon from '@material-ui/icons/Message';
import ExploreIcon from '@material-ui/icons/Explore';
import FavoriteIcon from '@material-ui/icons/Favorite';
import Avatar from "@material-ui/core/Avatar";

function Header() {
    return (
        <div className="header">
            <div className="header__logo">
                <h3>Instagram</h3>
            </div>
            <div className="header__search">
                <input
                    type="text"
                    placeholder="Search"
                />
            </div>
            <div className="header__items">
                <div className="header__item">
                    <HomeIcon />
                </div>
                <div className="header__item">
                    <MessageIcon />
                </div>
                <div className="header__item">
                    <ExploreIcon />
                </div>
                <div className="header__item">
                    <FavoriteIcon />
                </div>
                <div className="header__item">
                    <Avatar />
                </div>
            </div>
        </div>
    )
}

export default Header
