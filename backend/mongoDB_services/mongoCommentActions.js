const Comment = require('../mongoDB_models/Comment');

const formatComment = (comment) => {
    return({
        "Id": comment._id,
        "CommentContent": comment.commentContent,
        "NetScore": comment.netScore,
        "PostId": comment.postId,
        "CreatedDate": comment.CreatedDate
    });
}

const mongoFetchFormattedComments = async() => {
    var i;
    var formattedComment;
    var formattedComments = [];
    const comments = await Comment.find();
    for(i=0;i<comments.length;i++){
        formattedComment = formatComment(comments[i]);
        formattedComment.Id = String(formattedComment.Id);
        formattedComment.PostId = String(formattedComment.PostId);
        formattedComments.push(formttedComment);
    }
    return comments;
}

module.exports = { mongoFetchFormattedComments };