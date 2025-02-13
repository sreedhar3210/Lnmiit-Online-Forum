const cors = require('cors');
const express = require('express');
const bodyParser = require('body-parser');
const mongoDB = require('./mongoDB_services/db');
const app = express();
const mongoFetchData = require('./mongoDB_services/mongoFetchData');
const { mongoInsertPost, mongoPostScoreUpdate } = require('./mongoDB_services/mongoPostActions');
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
    await mongoPostScoreUpdate(data.id, data.value);
});

app.post('/api/post-comments', (req,res) => {
    const data = req.body;
    var postId = data.postId;
    var comment = commentNode(data.postId, data.commentContent);
    console.log('>>>>>> this is the comment being created ', comment);
    posts[postId-1].Comments.push(comment);
    console.log('>>>posts are ', posts);
    console.log('>>>post.comments are ', posts[0].Comments);
    //res.redirect('http://localhost:3000/display-posts');
});

app.post('/api/comment-likes-or-dislikes', (req,res) => {
    console.log('inside comments likes or dislikes');
    const data = req.body;

    posts[data.postId-1].Comments[data.id-1].NetScore = data.value;
    console.log('posts are ', posts);
})

app.listen(port,() => {
    console.log('listening on the port ' + port);
});