const mongoose = require('mongoose');
const { Schema } = mongoose;

const PostLikeSchema = new Schema({

	isLiked:{
		type: Boolean,
		default: false
	},
	isDisliked: {
		type: Boolean,
		default: false
	},
	postId:{
		type: mongoose.Schema.Types.ObjectId,
		ref: 'post',
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

module.exports = mongoose.model('postLike', PostLikeSchema);