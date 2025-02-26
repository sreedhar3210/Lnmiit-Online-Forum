const mongoose = require('mongoose');
const { Schema } = mongoose;

const OtpSchema = new Schema({

	otp: {
		type: Number,
		required: true
	},
	userEmail: {
		type: String,
		required: true
	},
	createdAt: {
		type: Date,
		expires: 900,
		default: Date.now
	}
	
}, {
	versionKey: false
})

module.exports = mongoose.model('otp', OtpSchema);