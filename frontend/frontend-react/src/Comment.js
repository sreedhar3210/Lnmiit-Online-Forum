import React, { useState, useEffect } from 'react'

function Comment({ comment }) {

    const [comScore, setComScore] = useState(comment.NetScore);
    //const initialRender = useRef(true);

    const handleLike = () => {
        setComScore(comScore+1);
    }

    const handleDisLike = () => {
        setComScore(comScore-1);
    }

    useEffect(() => {

        if(comScore !== comment.NetScore){
            //console.log('>>>> checking initial render value', initialRender.current);
            let options = {
                method: "POST",
                headers: {
                "Content-Type": "application/json"
                },
                body: JSON.stringify({
                id: comment.Id,
                postId: comment.PostId,
                value: comScore
                }),
            }
            
            console.log('>>>>>> comment score use Effect is executesd.')
            fetch('http://localhost:8080/api/comment-likes-or-dislikes', options)
        }
        // eslint-disable-next-line
    }, [comScore]);

    return (
        <div>
            <p>
                {comment.Id} Comment Content is {comment.CommentContent}
            </p>
            {/* Like and Dislike Buttons */}
            <div className="reaction-buttons">
                <button className="like-button" onClick={handleLike}>👍 Like</button>
                <button className="dislike-button" onClick={handleDisLike}>👎 Dislike</button>
                <p>netScore is {comScore}</p>
            </div>
        </div>
    )
}

export default Comment
