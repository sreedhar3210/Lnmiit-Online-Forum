const cors = require('cors');
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const createPostNode = require('./CreatePostNode');
const app = express();

const port = 8080;
var curId = 0;
var posts = [];

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/create-post', (req,res) => {
    var postContent = req.body.PostContent;
    posts.push({
        "Id": ++curId,
        "PostContent": postContent,
        "NetScore": 0
    });
    console.log('PostContent is ', postContent);
    console.log('posts are ', posts);
    res.redirect('http://localhost:3000/display-posts');
});

app.get('/api/get-posts', (req, res) => {
    
    res.send(posts); // Send JSON response
});


app.listen(port,() => {
    console.log('listening on the port ' + port);
});