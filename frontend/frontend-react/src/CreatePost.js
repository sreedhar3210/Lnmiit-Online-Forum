import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import './css/CreatePost.css';

const CreatePost = () => {  

    const navigate = useNavigate();
    const [readyToSubmit, setReadyToSubmit] = useState(false);
    const [tag, setTag] = useState('');
    const [postContent, setPostContent] = useState('');
    const [tags, setTags] = useState(['Html', 'JS']);

    const handlePostContentChange = (event) => {
        setPostContent(event.target.value);
    }

    const handleOnSubmit = (event) => {
        console.log('>>>> submit button is clicked.')
        setReadyToSubmit(true);
    }

    const handleTagInputChange = (event) => {
        setTag(event.target.value);
    };

    const handleTagSubmit = (event) => {
        console.log('submitted tag is ', tag);
        setTags([...tags, tag]); // Create a new array with the existing and new tags
        console.log('new Tags Array is ', [...tags, tag]); // Logging the updated array
        setTag(''); // Reset tmpTag
    };
    
    useEffect(() => {

        if(readyToSubmit === true){

            let options = {
              method: "POST",
              headers: {
                "Content-Type": "application/json"
              },
              body: JSON.stringify({
                postContent: postContent,
                tags: tags
              }),
            }
          
            console.log('>>>>>> CreatePost use Effect is executed.')
            fetch('http://localhost:8080/api/create-post', options)
            // ************************
            // commenting the below one, for testing purposes but shall be removed later.
            // .then((res) => {
            //     navigate('/display-posts');
            // })
            // ************************
        }
        // eslint-disable-next-line
    }, [readyToSubmit]);

    return(
        <div>
            <Navbar/>
            <div className="postContent">
                {/* <form action="http://localhost:8080/api/create-post" method="POST" className="postForm"> */}
                    <textarea
                        name="PostContent"
                        placeholder="Enter post content here" 
                        className="postContentInput"
                        onChange={handlePostContentChange}
                        required></textarea>
                    
                    <input
                        name="TagInput"
                        type="text"
                        value={tag}
                        onChange={handleTagInputChange}
                        className="tagInput"
                    ></input>
                    <button
                        type="button"
                        onClick={handleTagSubmit}
                        className="tagSubmitButton"
                    >Add Tag</button>
                    <div className="tagsContainer">
                        {tags.map((tag, index) => (
                            <span key={index} className="tag">
                                {tag}
                            </span>
                        ))}
                    </div>
                    <button 
                        type="submit" 
                        className="postContentSubmit"
                        onClick={handleOnSubmit}>Submit</button>
                {/* </form> */}
            </div>
        </div>
    );
};

export default CreatePost;
