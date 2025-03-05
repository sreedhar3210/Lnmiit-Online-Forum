const express = require('express');
const router = express.Router();
const { mongoInsertComment, mongoCommentScoreUpdate } = require('../mongoDB_services/mongoCommentActions');
const commentNode = require('../data_nodes/CommentNode');

// Create a new comment
router.post('/post-comments', async (req, res) => {
    const data = req.body;
    const comment = commentNode(data.postId, data.commentContent, data.owner);
    await mongoInsertComment(comment);
    res.status(200).json({ success: true });
});

// Update comment likes/dislikes
router.post('/comment-likes-or-dislikes', async (req, res) => {
    const data = req.body;
    await mongoCommentScoreUpdate(data.id, data.value);
    res.status(200).json({ success: true });
});

module.exports = router;