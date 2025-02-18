import React, { useState, useEffect } from 'react';
import './css/Post.css';
import Comment from './Comment';

function Post({ post }) {

  const [toDelete, setToDelete] = useState(false);
  const [score, setScore] = useState(post.NetScore);
  const [tmpCommentContent, setTmpCommentContent] = useState('');
  const [commentContent, setCommentContent] = useState('');

  const handleLike = () => {
    setScore(score+1);
    //post.NetScore+=score;
  }

  const handleDisLike = () => {
    setScore(score-1);
    //post.NetScore+=score;
  }

  const handleDelete = () => {
    console.log('>>>> Delete button is clicked');
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
    
    if(score !== post.NetScore){

      let options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          id: post.Id,
          value: score
        }),
      }
    
      fetch('http://localhost:8080/api/post-likes-or-dislikes', options)
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
          commentContent: commentContent
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
      <p className="post-content">
        {post.PostContent}
        <br/>
        <span className="post-date">Post Created at {post.CreatedDate}</span>
      </p>

      {/* Like and Dislike Buttons */}
      <div className="reaction-buttons">
        <button className="like-button" onClick={handleLike}>👍 Like</button>
        <button className="dislike-button" onClick={handleDisLike}>👎 Dislike</button>
        <p className="net-score">NetScore is {score}</p>
        <button className="delete-button" onClick={handleDelete}>Delete</button>
      </div>

      {/* Displaying comments */}
      <ul className="comment-list">
        {commentItems}
      </ul>

      {/* Comment Section */}
      <div className="comment-section">
        <input
          type="text"
          placeholder="Write a comment..."
          className="comment-input"
          value={tmpCommentContent}
          onChange={handlecommentContentChange}
        />
        <button
          className="add-comment-button"
          onClick={handleOnCommentSubmit}
        >Add Comment</button>
      </div>
    </div>
  );
}

export default Post;
