const cors = require('cors');
const express = require('express');
const bodyParser = require('body-parser');
const mongoDB = require('./mongoDB_services/db');
const mongoFetchData = require('./mongoDB_services/mongoFetchData');

const app = express();
const port = 8080;

const postRoutes = require('./routes/postRoutes');
const commentRoutes = require('./routes/commentRoutes');
const tagRoutes = require('./routes/tagRoutes');
const emailRoutes = require('./routes/emailRoutes');

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

mongoDB();

app.use('/api', postRoutes);
app.use('/api', commentRoutes);
app.use('/api', tagRoutes);
app.use('/api', emailRoutes);

app.listen(port,() => {
    console.log('listening on the port ' + port);
});