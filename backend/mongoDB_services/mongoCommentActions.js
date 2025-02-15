const Comment = require('../mongoDB_models/Comment');

const formatComment = (comment) => {
    return({
        "Id": comment._id,
        "CommentContent": comment.commentContent,
        "NetScore": comment.netScore,
        "PostId": comment.postId,
        "CreatedDate": comment.createdDate
    });
}

const mongoInsertComment = async(comment) => {
    console.log('>>>> mongoInsertComment is called with ', comment);
    const newComment = new Comment(comment);

    newComment.save();
    console.log('>>>> Comment is inserted.');
}

const mongoCommentScoreUpdate = async(commentId, newScore) => {
    console.log('>>>> mongoCommentScoreUpdate method is called');
    await Comment.updateOne(
        { _id: commentId },
        { $set: { netScore: newScore } } // Only update the netScore field
    );
}

const mongoFetchComments = async() => {
    var i;
    var formattedComment;
    var formattedComments = [];
    const comments = await Comment.find();
    for(i=0;i<comments.length;i++){
        formattedComment = formatComment(comments[i]);
        formattedComment.Id = String(formattedComment.Id);
        formattedComment.PostId = String(formattedComment.PostId);
        formattedComments.push(formattedComment);
    }
    console.log('>>> formattedComments are ', formattedComments);
    return formattedComments;
}

module.exports = { mongoFetchComments, mongoInsertComment, mongoCommentScoreUpdate };