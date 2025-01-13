import React, { useState, useEffect } from 'react';
import './css/Post.css';

function Post({ post }) {

  const [score, setScore] = useState(post.NetScore);

  const handleLike = () => {
    setScore(score+1);
    //post.NetScore+=score;
  }

  const handleDisLike = () => {
    setScore(score-1);
    //post.NetScore+=score;
  }

  useEffect(() => {
    
    if(score !== undefined){

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
    
      console.log('>>>>>> use Effect is executesd.')
      fetch('http://localhost:8080/api/post-likes-or-dislikes', options)
          //.then((response) => response.json())
          //.then((json) => console.log(json))

    }

  }, [score, post.Id]);

  return (
    <div className="post-container">
      <p className="post-content">
        {post.Id} Post content is {post.PostContent}
      </p>

      {/* Like and Dislike Buttons */}
      <div className="reaction-buttons">
        <button className="like-button" onClick={handleLike}>👍 Like</button>
        <button className="dislike-button" onClick={handleDisLike}>👎 Dislike</button>
        <p>netScore is {post.NetScore}</p>
      </div>

      {/* Comment Section */}
      <div className="comment-section">
        <input
          type="text"
          placeholder="Write a comment..."
          className="comment-input"
        />
        <button className="add-comment-button">Add Comment</button>
      </div>
    </div>
  );
}

export default Post;
