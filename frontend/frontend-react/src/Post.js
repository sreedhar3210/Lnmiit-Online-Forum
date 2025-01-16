import React, { useState, useEffect } from 'react';
import './css/Post.css';
import Comment from './Comment';

function Post({ post }) {

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

  const handlecommentContentChange = (event) => {
    console.log('>>>>> handleCommentContentChange is executed');
    setTmpCommentContent(event.target.value);
    console.log('>>>>>> tmpCommentContent is ', tmpCommentContent);
  }

  const handleOnCommentSubmit = (event) => {
    console.log('>>>>>>> submit button is clicked.')
    setCommentContent(tmpCommentContent);
    setTmpCommentContent('');
    console.log('>>>>>>> on submit button has been clicked and comment Content is ', commentContent);
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
    }
  }, [score, post.Id]);

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
      console.log('>>>>>> comments useEffect is called.')
      fetch('http://localhost:8080/api/post-comments', options)
    }
  }, [commentContent, post.Id])

  let commentItems = [];
  for (let i = 0; i < post.Comments.length; i++) {
    commentItems.push(
      <Comment comment = {post.Comments[i]} />
      // <Post post={posts[i]} />
    );
  }

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

      {/* Displaying comments */}
      <ul>
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
