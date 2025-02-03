const Post = require('../mongoDB_models/Post');

const mongoInsertPost = async(post) => {
    console.log('>>>> mongoInsertPosts is called');
    const newPost = new Post(post);

    await newPost.save();
    console.log('>>>> post is saved');
};

module.exports = { mongoInsertPost }