const { mongoFetchPosts } = require('./mongoPostActions');
const { mongoFetchComments } = require('./mongoCommentActions');
const { mongoFetchTags } = require('./mongoTagActions');

const formatData = async() => {
    console.log('>>>> inside formatData method');
    var i,j,postIdIndex;
    var data = [], postIds = [];
    const posts = await mongoFetchPosts();
    const comments = await mongoFetchComments();
    const tags = await mongoFetchTags();
    const tagIdNameMap = new Map();             // Map<tagId, tagName>

    for(i=0; i<tags.length; i++){
        tagIdNameMap.set(tags[i].Id, tags[i].TagName);
    }

    for(i=0; i<posts.length; i++){
        postIds.push(posts[i].Id);
        for(j=0; j<(posts[i].Tags).length; j++){
            // tagId = posts[i].tags[j];
            // formattedPost.Tags.push(tagIdNameMap.get(tagId));
            posts[i].Tags[j] = tagIdNameMap.get(posts[i].Tags[j]);
        }
        data.push(posts[i]);
    }
    console.log('>>>> postIds are ', postIds);
    for(i=0; i<comments.length; i++){
        console.log('>>>>comments[',i,'] = ',comments[i]);
        postIdIndex = postIds.indexOf(comments[i].PostId);
        console.log('>>>> comments postID IS ', comments[i].PostId, ' its type is ', typeof comments[i].PostId);
        if(postIdIndex >= 0){
            data[postIdIndex].Comments.push(comments[i]);
        }
    }
    return(data);
}

const mongoFetchData = async() => {
    const formattedData = await formatData();
    console.log('>>>>>> formatted Data  in mongofetch posts is', formattedData);
    return formattedData;
}

module.exports = mongoFetchData;