const { mongoFetchFormattedPosts } = require('./mongoPostActions/mongoFetchFormattedPosts');
const { mongoFetchFormattedComments } = require('./mongoCommentActions/mongoFetchFormattedComments');
const { mongoFetchFormattedTags } = require('./mongoTagActions/mongoFetchFormattedTags');

const formatData = async() => {
    var i,j,postIdIndex;
    var data = [], postIds = [];
    const posts = await mongoFetchFormattedPosts();
    const comments = await mongoFetchFormattedComments();
    const tags = await mongoFetchFormattedTags();
    const tagIdNameMap = new Map();             // Map<tagId, tagName>

    for(i=0; i<tags.length; i++){
        tagIdNameMap.set(tags[i].Id, tags[i].TagName);
    }

    for(i=0; i<posts.length; i++){
        postIds.push(posts[i].Id);
        for(j=0; j<(posts[i].tags).length; j++){
            // tagId = posts[i].tags[j];
            // formattedPost.Tags.push(tagIdNameMap.get(tagId));
            posts[i].Tags[j] = tagIdNameMap.get(posts[i].Tags[j]);
        }
        data.push(posts[i]);
    }
    for(i=0; i<comments.length; i++){
        postIdIndex = postIds.indexOf(comments[i].PostId);
        if(postIdIndex >= 0){
            data[postIdIndex].Comments.push(comments[i]);
        }
    }
    return(data);
}

const mongoFetchData = async() => {
    const formattedData = await formatData();
    console.log('>>>>>> formatted Data  in mongofetch posts is', formattedData);
    return { success: true, data: formattedData };
}

module.exports = mongoFetchData;