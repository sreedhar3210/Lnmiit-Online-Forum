import React from "react";

const Navbar = () => {

    const handleCreatePostClick = () => {
        console.log('handle create posts button is clicked.')
    };

    return(
        <div>
            <button onClick={handleCreatePostClick}>Create Post</button>
            <button>Display Posts</button>
        </div>
    )
}

export default Navbar;