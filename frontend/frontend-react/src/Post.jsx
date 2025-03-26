import React, { useState, useEffect } from 'react';
import './css/Post.css';
import Comment from './Comment';
import { BiSolidLike } from "react-icons/bi";
import { BiLike } from "react-icons/bi";
import { BiSolidDislike } from "react-icons/bi";
import { BiDislike } from "react-icons/bi";

function Post({ post }) {

  const [isLiked, setIsLiked] = useState(post.IsLiked);
  const [isDisliked, setIsDisliked] = useState(post.IsDisliked);
  const [toDelete, setToDelete] = useState(false);
  const [score, setScore] = useState(post.NetScore);
  const [isScoreChanged, setisScoreChanged] = useState(false);
  const [tmpCommentContent, setTmpCommentContent] = useState('');
  const [commentContent, setCommentContent] = useState('');
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

  const handleDelete = () => {
    setToDelete(true);
  }

  const handlecommentContentChange = (event) => {
    setTmpCommentContent(event.target.value);
  }

  const handleOnCommentSubmit = (event) => {
    setCommentContent(tmpCommentContent);
    setTmpCommentContent('');
  }

  //useEffect for like or dislike.
  useEffect(() => {
    if(isScoreChanged){

      let scoreOptions = {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          id: post.Id,
          value: score
        }),
      }
    
      fetch('http://localhost:8080/api/post-likes-or-dislikes', scoreOptions);

      let postLikeOptions = {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          postId: post.Id,
          userId: userId,
          isLiked: isLiked,
          isDisliked: isDisliked
        }),
      }

      fetch('http://localhost:8080/api/add-update-post-like', postLikeOptions);
    }

    // eslint-disable-next-line
  }, [score]);
  
  //useEffect for adding a comment.
  useEffect(() => {

    //since we are re-directing to DisplayPosts.js after creating a post, we need to use this 
    //to avoid creating empty comments.
    if(commentContent !== undefined && commentContent !== ''){

      let options = {
        method: "POST",
        headers:{
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          postId: post.Id,
          commentContent: commentContent,
          owner: userId
        }),
      }

      fetch('http://localhost:8080/api/post-comments', options)
      .then((res) => {
          console.log('>>>>> comment inserted and got back to frontend/Post.js');
          window.location.reload();
          //navigate('/display-posts');
      })
    }
    // eslint-disable-next-line
  }, [commentContent])

  let commentItems = [];
  for (let i = 0; i < post.Comments.length; i++) {
    commentItems.push(
      <Comment key = {post.Comments[i].Id} comment = {post.Comments[i]} />
    );
  }

  //useEffect for deleting post.
  useEffect(() => {

    if(toDelete){
      let options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          id: post.Id
        }),
      }

      fetch('http://localhost:8080/api/delete-post', options)
      .then((res) => {
        console.log('>>>> from frontend Post.js post is deleted');
        window.location.reload();
      })
    }
    // eslint-disable-next-line
  }, [toDelete])

  return (
    <div className="post-container">
      <div className="post-header">
        <img
          src={post.OwnerProfilePic}
          alt="No Profile Pic Uploaded"
          className="profile-picture"
        />
        <div className="username">{post.Owner}</div>
      </div>

      <div className="post-content-container">
        <p className="post-content">{post.PostContent}</p>
        <span className="post-date">Post Created at {post.CreatedDate}</span>
      </div>

      <div className="reaction-buttons">
        <button
          className={`like-button ${isLiked ? "liked" : ""}`}
          onClick={handleLike}
        >
            {isLiked ? <BiSolidLike/> : <BiLike/>}
        </button>
        <button
          className={`dislike-button ${isDisliked ? "disliked" : ""}`}
          onClick={handleDisLike}
        >
            {isDisliked ? <BiSolidDislike/> :  <BiDislike/>}
        </button>
        <span className="net-score">NetScore: {score}</span>
        <button className="delete-button" onClick={handleDelete}>
          Delete
        </button>
      </div>

      <div className="comments-section">
        <h3 className="comments-title">Comments</h3>
        <ul className="comment-list">{commentItems}</ul>
      </div>

      <div className="comment-form">
        <input
          type="text"
          placeholder="Write a comment..."
          className="comment-input"
          value={tmpCommentContent}
          onChange={handlecommentContentChange}
        />
        <button className="add-comment-button" onClick={handleOnCommentSubmit}>
          Add Comment
        </button>
      </div>
    </div>
  );
}

export default Post;
