import React, { useState, useEffect } from "react";
import { FaTimes } from "react-icons/fa";
import './css/AddTag.css';

const AddTagModal = () => {  

    const [tag, setTag] = useState('');
    const [tagReadyToSubmit, setTagReadyToSubmit] = useState(false);
    const [hideModal, setHideModal] = useState(true);

    const handleButtonClick = () => {
        console.log('>>>>> Add a tag button clicked.')
        setHideModal(!hideModal);
    }

    const handleTagChange = (event) => {
        setTag(event.target.value);
    }

    const handleTagSubmit = () => {
        console.log('>>> tag is submitted');
        setTagReadyToSubmit(true);
    }

    useEffect(() => {
        if(tagReadyToSubmit && tag!==''){
            let options = {
              method: "POST",
              headers: {
                "Content-Type": "application/json"
              },
              body: JSON.stringify({
                tagName: tag
              }),
            }
          
            console.log('>>>>>> tags use Effect is executed.')
            fetch('http://localhost:8080/api/create-tag', options)
            .then((res) => {
                window.location.reload();
            })
        }
        // eslint-disable-next-line
    }, [tagReadyToSubmit]);

    return(
        <div className="add-tag-container">
            <div className="modal-content" hidden={hideModal}>
                <button
                    type="button"
                    onClick={handleButtonClick}>
                        <FaTimes size={20} color="black" />
                </button>
                <input
                    type="text"
                    onChange={handleTagChange}>
                </input>
                <button
                    type="button"
                    onClick={handleTagSubmit}>
                        Submit
                </button>
            </div>    
            <div className="button-container" hidden={!hideModal}>
                <button
                    type="button"
                    className="toggle-modal-button"
                    onClick={handleButtonClick}>Add a Tag</button>
            </div>
        </div>
    );
};

export default AddTagModal;
