const mongoose = require('mongoose');
const { Schema } = mongoose;

const TagSchema = new Schema({

	tagName: {
		type: String,
		required: true
	}
}, {
    versionKey: false
});

module.exports = mongoose.model('tag', TagSchema);