const mongoose = require('mongoose');
const { Schema } = mongoose;

const CommentSchema = new Schema({

    commentContent:{
        type: String,
        required: true
    },
    netScore:{
        type: Number,
        required: true,
        default: 0
    },
    postId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'post',
        required: true
    },
    createdDate:{
        type: Date,
        immutable: true,
        default: Date.now
    }

});

module.exports = mongoose.model('comment', CommentSchema);