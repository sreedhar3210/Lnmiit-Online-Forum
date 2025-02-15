import React, { useState, useEffect } from "react";
import Select from "react-select";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import './css/CreatePost.css';

const CreatePost = () => {  

    const navigate = useNavigate();
    const [selectedTags, setSelectedTags] = useState([]);
    const [readyToSubmit, setReadyToSubmit] = useState(false);
    const [postContent, setPostContent] = useState('');
    const options = [
        {   value: '67a20fdbd22deb270c0a12cd', label: 'Java'},
        {   value: '67a20febd22deb270c0a12ce', label: 'Html'},
        {   value: '67a20ffbd22deb270c0a12cf', label: 'Cinema'}
    ];

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
        <div>
            <Navbar/>
            <div className="postContent">
                    <textarea
                        name="PostContent"
                        placeholder="Enter post content here" 
                        className="postContentInput"
                        onChange={handlePostContentChange}
                        required></textarea>
                    <p>this is being displayed</p>
                
                    <Select
                        isMulti
                        className="tagDropdown"
                        options={options} 
                        onChange={handleDropdownChange}/>

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
