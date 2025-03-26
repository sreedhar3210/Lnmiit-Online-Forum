import React, { useState, useEffect } from 'react';
import './css/Comment.css';
import { BiSolidLike } from "react-icons/bi";
import { BiLike } from "react-icons/bi";
import { BiSolidDislike } from "react-icons/bi";
import { BiDislike } from "react-icons/bi";

function Comment({ comment }) {

    const [score, setScore] = useState(comment.NetScore);
    const [isLiked, setIsLiked] = useState(comment.IsLiked);
    const [isDisliked, setIsDisliked] = useState(comment.IsDisliked);
    const [isScoreChanged, setisScoreChanged] = useState(false);
    const userId = localStorage.getItem('UserId');

    const handleLike = () => {
        setScore(isLiked ? score-1 : score+(isDisliked ? 2 : 1));                //updating based on previous isLiked
        setIsDisliked(false);
        setIsLiked(!isLiked);
        setisScoreChanged(true);
    }

    const handleDisLike = () => {
        setScore(isDisliked ? score+1 : score-(isLiked ? 2 : 1));             //updating based on previous isDisliked
        setIsLiked(false);
        setIsDisliked(!isDisliked);
        setisScoreChanged(true);
    }

    useEffect(() => {

        if(isScoreChanged){
            //console.log('>>>> checking initial render value', initialRender.current);
            let scoreOptions = {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    id: comment.Id,
                    postId: comment.PostId,
                    value: score
                }),
            }
            
            fetch('http://localhost:8080/api/comment-likes-or-dislikes', scoreOptions);

            let commentLikeOptions = {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    commentId: comment.Id,
                    userId: userId,
                    isLiked: isLiked,
                    isDisliked: isDisliked
                }),
            }

            fetch('http://localhost:8080/api/add-update-comment-like', commentLikeOptions);
        }
        // eslint-disable-next-line
    }, [score]);

    return (
        <div className="comment-container">
          <div className="comment-content">
            <p>{comment.CommentContent}</p>
            <span className="comment-date">
              Comment Created at {comment.CreatedDate}
            </span>
          </div>

          <div className="reaction-buttons">
            <button
              className={`like-button ${isLiked ? "liked" : ""}`}
              onClick={handleLike}
              aria-label="Like comment"
            >
              {isLiked ? <BiSolidLike /> : <BiLike />}
            </button>
            <button
              className={`dislike-button ${isDisliked ? "disliked" : ""}`}
              onClick={handleDisLike}
              aria-label="Dislike comment"
            >
              {isDisliked ? <BiSolidDislike /> : <BiDislike />}
            </button>
            <span className="net-score">NetScore: {score}</span>
          </div>
        </div>
    )
}

export default Comment
