import React from "react";
import Navbar from "./Navbar";
import './css/CreatePost.css'

const CreatePost = () => {    
    return(
        <div>
            <Navbar/>
            <div className="postContent">
                <form action="http://localhost:8080/create-post" method="POST">
                    <textarea
                        name="PostContent"
                        placeholder="Enter post content here" 
                        className="postContentInput"
                        required></textarea>
                    <button 
                        type="submit" 
                        className="postContentSubmit">Submit</button>
                </form>
            </div>
        </div>
    )
}

export default CreatePost;