const cors = require('cors');
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const createPostNode = require('./CreatePostNode');
const app = express();

const port = 8080;
const createPost = (id, postContent) => {
    return({
        "Id": id,
        "PostContent": postContent,
        "NetScore": 5,
        "Comments": []
    })
};
const createComment = (id, postId, commentContent) => {
    return({
        "Id": id,
        "PostId": postId,
        "CommentContent": commentContent
    })
}
var cnt = 0;
var curId = 0;
var curCommentId = 0;
var posts = [];

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.post('/api/create-post', (req,res) => {
    var postContent = req.body.PostContent;
    var post = createPost(++curId, postContent);
    posts.push(post);
    res.redirect('http://localhost:3000/display-posts');
});

app.get('/api/get-posts', (req, res) => {
    res.send(posts); // Send JSON response
});

app.post('/api/post-likes-or-dislikes', (req,res) => {
    const data = req.body;
    console.log('data is ', data);
    posts[data.id-1].NetScore=data.value;
    console.log('posts are ', posts);
    res.redirect('http://localhost:3000/display-posts');
});

app.post('/api/post-comments', (req,res) => {
    console.log('>>>>>> comments has been called.');
    const data = req.body;
    console.log('posting comments', data);
    var postId = req.body.postId;
    var comment = createComment(++curCommentId, data.postId, data.commentContent);
    console.log('>>>>>> this is the comment being created ', comment);
    posts[postId-1].Comments.push(comment);
    console.log('>>>posts are ', posts);
    console.log('>>>post.comments are ', posts[0].Comments);
})


app.listen(port,() => {
    console.log('listening on the port ' + port);
});