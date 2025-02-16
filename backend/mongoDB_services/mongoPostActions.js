const Post = require('../mongoDB_models/Post');

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

const convertObjIdsToStrings = (objIds) => {
    const stringIds = [];
    objIds.forEach((objId) => {
        var stringId = String(objId);
        stringIds.push(stringId);
    });
    return stringIds;
}

const mongoFetchPosts = async(...args) => {
    var i;
    var formattedPost;
    var posts,formattedPosts = [];
    if(args.length === 0)               posts = await Post.find(); 
    else{
        posts = await Post.find({ _id : args[0] });
    }
    if(posts.length > 0){
        for(i=0;i<posts.length;i++){
            formattedPost = formatPost(posts[i]);
            formattedPost.Id = String(formattedPost.Id);
            formattedPost.Tags = convertObjIdsToStrings(formattedPost.Tags);
            formattedPosts.push(formattedPost); 
        }
    }
    return formattedPosts;
}

const mongoInsertPost = async(post) => {
    const newPost = new Post(post);

    await newPost.save();
};

const mongoPostScoreUpdate = async(postId, newScore) => {
    await Post.updateOne(
        { _id: postId },
        { $set: { netScore: newScore } } // Only update the netScore field
    );
}

module.exports = { mongoInsertPost, mongoPostScoreUpdate, mongoFetchPosts};