const cors = require('cors');
const express = require('express');
const bodyParser = require('body-parser');
const mongoDB = require('./db');
const app = express();

const port = 8080;

const createPost = (id, postContent, tags) => {
    return({
        "Id": id,
        "PostContent": postContent,
        "NetScore": 0,
        "Comments": [],
        "Tags": tags
    })
};

const createComment = (postId, commentContent) => {
    return({
        "Id": posts[postId-1].Comments.length + 1,
        "PostId": postId,
        "CommentContent": commentContent,
        "NetScore": 0
    })
};

var cnt = 0;
var curId = 0;
var curCommentId = 0;
var posts = [];
const tagsSet = new Set();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

mongoDB();

app.post('/api/create-post', (req,res) => {
    var data = req.body;
    var post = createPost(++curId, data.postContent, data.tags);
    posts.push(post);
    data.tags.forEach(tag => {
        tagsSet.add(tag);
    });
    res.status(200).json({ success: true });
});

app.get('/api/get-posts', (req, res) => {
    res.send(posts); // Send JSON response
});

app.post('/api/post-likes-or-dislikes', (req,res) => {
    const data = req.body;
    console.log('data is ', data);
    posts[data.id-1].NetScore=data.value;
    console.log('posts are ', posts);
    //res.redirect('http://localhost:3000/display-posts');
});

app.post('/api/post-comments', (req,res) => {
    const data = req.body;
    var postId = data.postId;
    var comment = createComment(data.postId, data.commentContent);
    console.log('>>>>>> this is the comment being created ', comment);
    posts[postId-1].Comments.push(comment);
    console.log('>>>posts are ', posts);
    console.log('>>>post.comments are ', posts[0].Comments);
    //res.redirect('http://localhost:3000/display-posts');
});

app.post('/api/comment-likes-or-dislikes', (req,res) => {
    console.log('inside comments likes or dislikes');
    const data = req.body;
    // console.log('data is ', data);
    // console.log('posts are ', posts);
    // console.log('>>>>> corresponding post is ', posts[data.postId-1]);
    // console.log('>>>>> post comments are ', posts[data.postId-1].Comments);
    // console.log('>>>>> corresponding comment is ', posts[data.postId-1].Comments[data.Id-1])

    posts[data.postId-1].Comments[data.id-1].NetScore = data.value;
    console.log('posts are ', posts);
})

app.listen(port,() => {
    console.log('listening on the port ' + port);
});