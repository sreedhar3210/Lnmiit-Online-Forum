const mongoose = require('mongoose');
const { Schema } = mongoose;

const CommentLikeSchema = new Schema({

	isLiked:{
		type: Boolean,
		default: false
	},
	isDisliked: {
		type: Boolean,
		default: false
	},
	commentId:{
		type: mongoose.Schema.Types.ObjectId,
		ref: 'comment',
		required: true
	},
	userId:{
		type: mongoose.Schema.Types.ObjectId,
		ref: 'user',
		required: true
	}

}, {
	versionKey: false
});

module.exports = mongoose.model('commentLike', CommentLikeSchema);