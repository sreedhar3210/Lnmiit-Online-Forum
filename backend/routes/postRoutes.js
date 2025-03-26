const express = require('express');
const router = express.Router();
const { mongoInsertPost, mongoPostScoreUpdate, mongoDeletePost } = require('../mongoDB_services/mongoPostActions');
const { mongoDeleteCommentsWithPostId } = require('../mongoDB_services/mongoCommentActions');
const mongoFetchData = require('../mongoDB_services/mongoFetchData');
const postNode = require('../data_nodes/PostNode');

// Create a new post
router.post('/create-post', async (req, res) => {
    const data = req.body;
    const post = postNode(data.postContent, data.tags, data.createdById);
    console.log('>>> in postRoutes.js postNode is ', post);
    await mongoInsertPost(post);
    res.status(200).json({ success: true });
});

// Get all posts
router.get('/get-posts', async (req, res) => {
    console.log('>>>> in post routes userId is ', req.query.userId);
    const posts = await mongoFetchData(req.query.userId);
    res.send(posts);
});

// Update post likes/dislikes
router.post('/post-likes-or-dislikes', async (req, res) => {
    const data = req.body;
    await mongoPostScoreUpdate(data.id, data.value);
    res.status(200).json({ success: true });
});

// Delete a post
router.post('/delete-post', async (req, res) => {
    const data = req.body;
    await mongoDeletePost(data.id);
    await mongoDeleteCommentsWithPostId(data.id);
    res.status(200).json({ success: true });
});

module.exports = router;