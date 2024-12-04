import React from "react";
import Navbar from "./Navbar";

const CreatePost = () => {
    const handlePostSubmitButton = () => {
        console.log('post submit button is clicked.');
        console.log('PostContent is ');
    }
    
    return(
        <div>
            <Navbar/>
            <input type="text" placeholder="Enter your post content here." name="PostContent"></input>
            <button type="submit"></button>
        </div>
    )
}

export default CreatePost;