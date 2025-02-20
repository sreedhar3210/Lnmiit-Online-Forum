import React from "react";
import { useNavigate } from "react-router-dom";

const Navbar = () => {

    const navigate = useNavigate();

    const handleonClickHome = () => {
        navigate('/');
    };

    const handleonClickCreatePost = () => {
        navigate('/create-post');
    };

    const handleonClickDisplayPosts = () => {
        navigate('/display-posts');
    }

    return(
        <div>
            <button onClick={handleonClickHome}>Home</button>
            <button onClick={handleonClickCreatePost}>Create Post</button>
            <button onClick={handleonClickDisplayPosts}>Display Posts</button>
        </div>
    )
}

export default Navbar;