const Post = require('../mongoDB_models/Post');
const Comment = require('../mongoDB_models/Comment');

const formatPost = (post) => {
    return({
        "Id": post._id,
        "PostContent": post.postContent,
        "NetScore": post.netScore,
        "CreatedDate": post.createdDate,
        "Tags": post.tags,
        "Comments": []
    });
}

const formatComment = (comment) => {
    return({
        "Id": comment._id,
        "CommentContent": comment.commentContent,
        "NetScore": comment.netScore,
        "PostId": comment.postId,
        "CreatedDate": comment.CreatedDate
    });
}

const formatData = (posts, comments) => {
    var i,postIdIndex;
    var formattedPost, formattedComment, postId;
    var data = [];
    var postIds = [];
    for(i=0; i<posts.length; i++){
        formattedPost = formatPost(posts[i]);
        postId = (posts[i]._id).toString();
        postIds.push(postId);
        data.push(formattedPost);
    }
    console.log('postIds are ', postIds);
    for(i=0; i<comments.length; i++){
        formattedComment = formatComment(comments[i]);
        postId = (comments[i].postId).toString();
        postIdIndex = postIds.indexOf(postId);
        data[postIdIndex].Comments.push(formattedComment);
    }
    return(data);
}

const mongoFetchPosts = async() => {
    var formattedData = [];
    const posts = await Post.find();
    const comments = await Comment.find();
    formattedData = formatData(posts, comments);
    console.log('>>>>>> formatted Data  in mongofetch posts is', formattedData);
    return { success: true, data: formattedData };
}

module.exports = mongoFetchPosts;