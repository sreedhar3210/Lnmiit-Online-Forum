import React from 'react'

function Comment({ comment }) {
  return (
    <div>
    
      {/* Like and Dislike Buttons */}
      {/* <div className="reaction-buttons">
        <button className="like-button" onClick={handleLike}>👍 Like</button>
        <button className="dislike-button" onClick={handleDisLike}>👎 Dislike</button>
        <p>netScore is {comment.NetScore}</p>
      </div> */}
      <p>
        {comment.Id} Comment Content is {comment.CommentContent}
      </p>
    </div>
  )
}

export default Comment
