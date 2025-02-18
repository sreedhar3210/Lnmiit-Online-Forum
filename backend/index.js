const cors = require('cors');
const express = require('express');
const bodyParser = require('body-parser');
const mongoDB = require('./mongoDB_services/db');
const app = express();
const mongoFetchData = require('./mongoDB_services/mongoFetchData');
const { mongoInsertPost, mongoPostScoreUpdate, mongoDeletePost } = require('./mongoDB_services/mongoPostActions');
const { mongoInsertComment, mongoCommentScoreUpdate, mongoDeleteCommentsWithPostId } = require('./mongoDB_services/mongoCommentActions');
const { mongoFetchTags, mongoInsertTag } = require('./mongoDB_services/mongoTagActions');
const postNode = require('./data_nodes/PostNode');
const commentNode = require('./data_nodes/CommentNode');
const tagNode = require('./data_nodes/TagNode');

const port = 8080;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

mongoDB();

app.post('/api/create-post', async (req,res) => {
    var data = req.body;
    var post = postNode(data.postContent, data.tags);
    await mongoInsertPost(post);
    res.status(200).json({ success: true });
});

//insert posts is also being updated in backend as well.
app.get('/api/get-posts', async(req, res) => {
    const posts = await mongoFetchData();
    res.send(posts);
});

app.post('/api/post-likes-or-dislikes', async(req,res) => {
    const data = req.body;
    await mongoPostScoreUpdate(data.id, data.value);
});

app.post('/api/delete-post', async(req,res) => {
    const data =req.body;
    await mongoDeletePost(data.id);

    await mongoDeleteCommentsWithPostId(data.id);

    res.status(200).json({ success: true});

});

app.post('/api/post-comments', async(req,res) => {
    const data = req.body;
    var comment = commentNode(data.postId, data.commentContent);
    await mongoInsertComment(comment);
    res.status(200).json({ success: true });
});

app.post('/api/comment-likes-or-dislikes', async(req,res) => {
    const data = req.body;
    await mongoCommentScoreUpdate(data.id, data.value);
});

app.get('/api/get-tags', async(req, res) => {
    const tags = await mongoFetchTags();
    console.log('>>>>> from index.js fetched tags are ', tags);
    res.send(tags);
});

app.post('/api/create-tag', async(req, res) => {
    const data = req.body;
    const tag = tagNode(data.tagName);

    console.log('new tag which is being added is ', tag);
    await mongoInsertTag(tag);
    res.status(200).json({ success: true });
})

app.listen(port,() => {
    console.log('listening on the port ' + port);
});