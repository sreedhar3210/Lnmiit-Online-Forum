const express = require('express');
const router = express.Router();
const { mongoUpsertPostLike, mongoUpsertCommentLike } = require('../mongoDB_services/mongoLikeActions');

router.post('/add-update-post-like', async(req, res) => {
	let data = req.body;
	await mongoUpsertPostLike(data.postId, data.userId, data.isLiked, data.isDisliked);
});

router.post('/add-update-comment-like', async(req, res) => {
	let data = req.body;
	await mongoUpsertCommentLike(data.commentId, data.userId, data.isLiked, data.isDisliked);
});

module.exports = router;