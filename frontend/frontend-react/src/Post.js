import React from 'react';
import './css/Post.css';

function Post({ post }) {
  return (
    <div className="post-container">
      <p className="post-content">
        {post.Id} Post content is {post.PostContent}
      </p>

      {/* Like and Dislike Buttons */}
      <div className="reaction-buttons">
        <button className="like-button">👍 Like</button>
        <button className="dislike-button">👎 Dislike</button>
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
