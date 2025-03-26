const { mongoFetchPosts } = require('./mongoPostActions');
const { mongoFetchComments } = require('./mongoCommentActions');
const { mongoFetchTags } = require('./mongoTagActions');
const { mongoFetchUsers } = require('./mongoUserActions');
const { mongoFetchPostLikes } = require('./mongoLikeActions');
const { mongoFetchCommentLikes } = require('./mongoLikeActions');

const formatData = async(userId) => {
    var i,j,postIdIndex;
    var data = [], postIds = [];
    const posts = await mongoFetchPosts();
    const comments = await mongoFetchComments();
    const tags = await mongoFetchTags();
    const users = await mongoFetchUsers();
    const postLikes = await mongoFetchPostLikes(userId);
    const commentLikes = await mongoFetchCommentLikes(userId);
    const tagIdNameMap = new Map();             // Map<tagId, tagName>
    const userIdUserMap = new Map();            // Map<userId, userName>
    const postIdLikeDislikeMap = new Map();
    const commentIdLikeDislikeMap = new Map();  

    for(i=0; i<tags.length; i++){
        tagIdNameMap.set(tags[i].Id, tags[i].TagName);
    }

    users.forEach((user) => {
        userIdUserMap.set(user.Id, user);
    });

    postLikes.forEach((postLike) => {
        postIdLikeDislikeMap.set(postLike.PostId, { IsLiked: postLike.IsLiked,
                                                IsDisliked: postLike.IsDisliked});
    });

    commentLikes.forEach((commentLike) => {
        commentIdLikeDislikeMap.set(commentLike.CommentId, { IsLiked: commentLike.IsLiked, 
                                                        IsDisliked: commentLike.IsDisliked});
    });

    for(i=0; i<posts.length; i++){
        postIds.push(posts[i].Id);
        for(j=0; j<(posts[i].Tags).length; j++){
            //Fetching the name of tag.
            posts[i].Tags[j] = tagIdNameMap.get(posts[i].Tags[j]);
        }
        //fetching the name and profile pic of owner.

        let postOwner = userIdUserMap.get(posts[i].Owner);
        posts[i].Owner = postOwner.Username;
        posts[i].OwnerProfilePic = postOwner.ProfilePicUrl;
        let postLikeData = postIdLikeDislikeMap.get(posts[i].Id);
        posts[i].IsLiked = postLikeData ? postLikeData.IsLiked : false;
        posts[i].IsDisliked = postLikeData ? postLikeData.IsDisliked : false;
        data.push(posts[i]);
    }

    for(i=0; i<comments.length; i++){
        postIdIndex = postIds.indexOf(comments[i].PostId);
        if(postIdIndex >= 0){
            let commentLikeData = commentIdLikeDislikeMap.get(comments[i].Id);
            comments[i].IsLiked = commentLikeData ? commentLikeData.IsLiked : false;
            comments[i].IsDisliked = commentLikeData ? commentLikeData.IsDisliked : false;
            data[postIdIndex].Comments.push(comments[i]);
        }
    }
    return(data);
}

const mongoFetchData = async(userId) => {
    const formattedData = await formatData(userId);
    return formattedData;
}

module.exports = mongoFetchData;