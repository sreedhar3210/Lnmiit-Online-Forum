const express = require('express');
const router = express.Router();
const { mongoFetchTags, mongoInsertTag } = require('../mongoDB_services/mongoTagActions');
const tagNode = require('../data_nodes/TagNode');

// Get all tags
router.get('/get-tags', async (req, res) => {
    const tags = await mongoFetchTags();
    res.send(tags);
});

// Create a new tag
router.post('/create-tag', async (req, res) => {
    const data = req.body;
    const tag = tagNode(data.tagName);
    await mongoInsertTag(tag);
    res.status(200).json({ success: true });
});

module.exports = router;