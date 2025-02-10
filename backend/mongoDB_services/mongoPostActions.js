const Post = require('../mongoDB_models/Post');
//const { mongoFetchPosts } = require('./mongoFetchData');

const mongoInsertPost = async(post) => {
    console.log('>>>> mongoInsertPosts is called');
    const newPost = new Post(post);

    await newPost.save();
    console.log('>>>> post is saved');
};

const mongoPostScoreUpdate = async(postId, newScore) => {
    await Post.updateOne(
        { _id: postId },
        { $set: { netScore: newScore } } // Only update the netScore field
    );
}

module.exports = { mongoInsertPost, mongoPostScoreUpdate }