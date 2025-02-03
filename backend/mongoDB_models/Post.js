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
        type: Date,
        immutable: true,
        default: Date.now
    }
}, {
    versionKey: false
});

module.exports = mongoose.model('post', PostSchema);