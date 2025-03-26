const PostLike = require('../mongoDB_models/PostLike');
const CommentLike = require('../mongoDB_models/CommentLike');

const formatPostLike = (postLike) => {
    return({
        Id: String(postLike._id),
        IsLiked: postLike.isLiked,
        IsDisliked: postLike.isDisliked,
        PostId: String(postLike.postId),
        UserId: String(postLike.userId)
    })
};

const formatCommentLike = (commentLike) => {
    return({
        Id: String(commentLike._id),
        IsLiked: commentLike.isLiked,
        IsDisliked: commentLike.isDisliked,
        CommentId: String(commentLike.commentId),
        UserId: String(commentLike.userId)
    })
};

const mongoUpsertPostLike = async (postId, userId, isLiked, isDisliked) => {
    await PostLike.findOneAndUpdate(
        { postId: postId, userId: userId }, // Query to find the document
        { $set: { isLiked: isLiked, isDisliked: isDisliked } }, // Update fields
        { upsert: true } // Options: create if not exists, return updated doc
    );
};

const mongoUpsertCommentLike = async (commentId, userId, isLiked, isDisliked) => {
    await CommentLike.findOneAndUpdate(
        { commentId: commentId, userId: userId }, // Query to find the document
        { $set: { isLiked: isLiked, isDisliked: isDisliked } }, // Update fields
        { upsert: true }
    );
};

const mongoFetchPostLikes = async (userId) => {
    const userPostLikesList = await PostLike.find({ userId: userId });
    const formattedPostLikes = [];
    userPostLikesList.forEach((postLike) => {
        let formattedPostLike = formatPostLike(postLike);
        formattedPostLikes.push(formattedPostLike);
    });
    return formattedPostLikes;
};

const mongoFetchCommentLikes = async (userId) => {
    const userCommentLikesList = await CommentLike.find({ userId: userId });
    const formattedCommentLikes = [];
    userCommentLikesList.forEach((commentLike) => {
        let formattedCommentLike = formatCommentLike(commentLike);
        formattedCommentLikes.push(formattedCommentLike);
    });
    return formattedCommentLikes;
}

module.exports = { 
    mongoUpsertPostLike, 
    mongoUpsertCommentLike,
    mongoFetchPostLikes,
    mongoFetchCommentLikes
};
