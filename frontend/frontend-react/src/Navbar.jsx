import React from "react";
import { useNavigate } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import './css/Navbar.css';

const Navbar = () => {

    const navigate = useNavigate();
    const username = localStorage.getItem('Username');

    const handleonClickHome = () => {
        navigate('/');
    };

    const handleonClickCreatePost = () => {
        navigate('/create-post');
    };

    const handleOnClickProfile = () => {
        const myProfileUrl = '/profile/' + username;
        navigate(myProfileUrl);
    };

    return (
        <div className="navbar-container">
            <div className="navbar-buttons">
                <button className="nav-button" onClick={handleonClickHome}>Home</button>
                <button className="nav-button" onClick={handleonClickCreatePost}>Create Post</button>
            </div>
            <div className="profile-button-container">
                <button className="profile-button" onClick={handleOnClickProfile}>
                    <FaUserCircle className="profile-icon" />
                    {username}
                </button>
            </div>
        </div>
    );

}

export default Navbar;