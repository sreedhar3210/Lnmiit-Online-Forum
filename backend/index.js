const cors = require('cors');
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const createPostNode = require('./CreatePostNode');
const app = express();

const port = 8080;
var posts = [];

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '../frontend')));

// Set EJS as the view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '../frontend')); // Optional if templates aren't in a `views` folder

app.get('/', (req,res) => {
    res.sendFile(path.join(__dirname, '../frontend/Home.html'));
});

app.get('/create-post', (req,res) => {
    res.sendFile(path.join(__dirname, '../frontend/CreatePost.html'));
});

app.post('/create-post', (req,res) => {
    var postContent = req.body.PostContent;
    // var postNode = createPostNode(postContent);
    posts.push(postContent);
    //console.log('post content data is being displayed from react html method as ', postContent);
    res.redirect('/display-posts');
});

app.get('/display-posts', (req,res) => {
    res.render(path.join(__dirname, '../frontend/DisplayPosts.ejs'), { posts });
});

app.get('/api/get-posts', (req, res) => {
    const backendMsg = { "message" : "baaga pakadbandhi ga plan chesaav mike."};
    res.send(backendMsg); // Send JSON response
});


app.listen(port,() => {
    console.log('listening on the port ' + port);
});