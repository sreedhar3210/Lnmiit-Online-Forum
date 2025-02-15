const cors = require('cors');
const express = require('express');
const bodyParser = require('body-parser');
const mongoDB = require('./mongoDB_services/db');
const app = express();
const mongoFetchData = require('./mongoDB_services/mongoFetchData');
const { mongoInsertPost, mongoPostScoreUpdate } = require('./mongoDB_services/mongoPostActions');
const { mongoInsertComment, mongoCommentScoreUpdate } = require('./mongoDB_services/mongoCommentActions');
const postNode = require('./data_nodes/PostNode');
const commentNode = require('./data_nodes/CommentNode');

const port = 8080;

var cnt = 0;
var curId = 0;
var curCommentId = 0;
var posts = [];
//const tagsSet = new Set();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

mongoDB();

app.post('/api/create-post', async (req,res) => {
    var data = req.body;
    var post = postNode(data.postContent, data.tags);
    posts.push(post);
    await mongoInsertPost(post);
    console.log(post, ' is created');
    res.status(200).json({ success: true });
});

//insert posts is also being updated in backend as well.
app.get('/api/get-posts', async(req, res) => {
    const fetchedData = await mongoFetchData();
    posts = fetchedData.data;
    res.send(posts);
});

app.post('/api/post-likes-or-dislikes', async(req,res) => {
    const data = req.body;
    console.log('post likes or dislikes is called with postId = ', data.id, ' newScore is ', data.value);
    await mongoPostScoreUpdate(data.id, data.value);
});

app.post('/api/post-comments', async(req,res) => {
    const data = req.body;
    var comment = commentNode(data.postId, data.commentContent);
    console.log('>>>>>> this is the comment being created ', comment);
    await mongoInsertComment(comment);
    res.status(200).json({ success: true });
});

app.post('/api/comment-likes-or-dislikes', async(req,res) => {
    console.log('inside comments likes or dislikes');
    const data = req.body;
    console.log('comment likes or dislikes is called with commentId= ', data.id, ' newScore is ', data.value);
    await mongoCommentScoreUpdate(data.id, data.value);
})

app.listen(port,() => {
    console.log('listening on the port ' + port);
});