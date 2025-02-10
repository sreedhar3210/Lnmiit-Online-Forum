const Post = require('../mongoDB_models/Post');
const Comment = require('../mongoDB_models/Comment');
const Tag = require('../mongoDB_models/Tag');

const formatPost = (post) => {
    return({
        "Id": post._id,
        "PostContent": post.postContent,
        "NetScore": post.netScore,
        "CreatedDate": post.createdDate,
        "Tags": [],
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

const formatTag = (tag) => {
    return({
        "Id": tag._id,
        "TagName": tag.tagName,
        "TagDescription": tag.tagDescription
    });
}

const mongoFetchPosts = async(...args) => {
    var posts;
    if(args.length === 0)               posts = await Post.find(); 
    else{
        posts = await Post.find({ _id : args[0] });
    }
    return posts;
}

const mongoFetchComments = async() => {
    const comments = await Comment.find();
    return comments;
}

const mongoFetchTags = async() => {
    const tags = await Tag.find();
    return tags;
}

const formatData = async() => {
    var i,j,postIdIndex;
    var postId, tagId;
    var formattedPost, formattedComment;
    var data = [];
    var postIds = [];
    const posts = await mongoFetchPosts();
    const comments = await mongoFetchComments();
    const tags = await mongoFetchTags();
    const tagIdNameMap = new Map();             // Map<tagId, tagName>

    for(i=0; i<tags.length; i++){
        tagId = (tags[i]._id).toString();
        tagIdNameMap.set(tagId, tags[i].tagName);
    }
    for(i=0; i<posts.length; i++){
        postId = (posts[i]._id).toString();
        postIds.push(postId);
        formattedPost = formatPost(posts[i]);
        for(j=0; j<(posts[i].tags).length; j++){
            tagId = (posts[i].tags[j]).toString();
            formattedPost.Tags.push(tagIdNameMap.get(tagId));
        }
        data.push(formattedPost);
    }
    console.log('postIds are ', postIds);
    for(i=0; i<comments.length; i++){
        formattedComment = formatComment(comments[i]);
        postId = (comments[i].postId).toString();
        postIdIndex = postIds.indexOf(postId);
        if(postIdIndex >= 0){
            data[postIdIndex].comments.push(formattedComment);
        }
    }
    return(data);
}

const mongoFetchFormattedPosts = async() => {
    const formattedData = await formatData();
    console.log('>>>>>> formatted Data  in mongofetch posts is', formattedData);
    return { success: true, data: formattedData };
}

module.exports = { mongoFetchFormattedPosts, mongoFetchPosts };