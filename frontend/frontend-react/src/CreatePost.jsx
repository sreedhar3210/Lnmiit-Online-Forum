import React, { useState, useEffect } from "react";
import Select from "react-select";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import AddTag from './AddTag';
import './css/CreatePost.css';

const CreatePost = () => {  

    const navigate = useNavigate();
    const [selectedTags, setSelectedTags] = useState([]);
    const [readyToSubmit, setReadyToSubmit] = useState(false);
    const [postContent, setPostContent] = useState('');
    const [options, setOptions] = useState([]);

    const handlePostContentChange = (event) => {
        setPostContent(event.target.value);
    }

    const handleOnSubmit = (event) => {
        console.log('>>>> submit button is clicked.')
        setReadyToSubmit(true);
    }

    const handleDropdownChange = (selectedOptions) => {
        console.log('>>>>> selectedOptions are ', selectedOptions);
        var tagIds = [];
        for(var i=0; i<selectedOptions.length; i++){
            tagIds.push(selectedOptions[i].value);
        }
        setSelectedTags(tagIds);
        console.log('selected tags are ', selectedTags);
    }

    useEffect(() => {
        console.log('**** fetch tags is called');
        fetch("http://localhost:8080/api/get-tags")
            .then(res => res.json())
            .then(data => setOptions(data))
            .catch(err => console.error("Error fetching data:", err));
    }, [])
    
    useEffect(() => {
        if(readyToSubmit === true){
            let options = {
              method: "POST",
              headers: {
                "Content-Type": "application/json"
              },
              body: JSON.stringify({
                postContent: postContent,
                tags: selectedTags
              }),
            }
          
            console.log('>>>>>> CreatePost use Effect is executed.')
            fetch('http://localhost:8080/api/create-post', options)
            .then((res) => {
                setReadyToSubmit(false);
                navigate('/display-posts');
            })
        }
        // eslint-disable-next-line
    }, [readyToSubmit]);

    return(
        <div className="create-post-container">
            <Navbar/>
            <div className="post-content-wrapper">
                <textarea
                    name="PostContent"
                    placeholder="Enter post content here" 
                    className="post-content-input"
                    onChange={handlePostContentChange}
                    required
                ></textarea>
                <p className="display-message">This is being displayed</p>
                
                <div className="tag-selection-wrapper">
                    <Select
                        isMulti
                        className="tag-dropdown"
                        options={options} 
                        onChange={handleDropdownChange}
                    />
                    <AddTag/>
                </div>

                <button 
                    type="submit" 
                    className="post-content-submit"
                    onClick={handleOnSubmit}
                >Submit</button>
            </div>
        </div>
    );
};

export default CreatePost;
