const mongoose = require('mongoose');
const { Schema } = mongoose;

const PostSchema = new Schema({

    postContent:{
        type: String,
        required: true
    },
    netScore:{
        type: Number,
        required: true
    },
    createdDate:{
        type: String
    },
    tags: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Tag'  // Reference to the 'Tag' collection, if you're using a separate Tag model
    }],
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
}, {
    versionKey: false
});

module.exports = mongoose.model('post', PostSchema);