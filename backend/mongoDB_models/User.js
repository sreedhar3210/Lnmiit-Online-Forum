const mongoose = require('mongoose');
const { Schema }= mongoose;

const UserSchema = new Schema({
	userName:{
		type: String,
		required: true
	},
	userEmail:{
		type: String,
		required: true
	},
	firstName:{
		type: String
	},
	lastName:{
		type: String,
		required: true
	},
	birthDate:{
		type: String,
		required: true
	},
	password:{
		type: String,
		required: true
	},
	profilePicUrl:{
		type: String
	}

}, {
	versionKey: false
});

module.exports = mongoose.model('user', UserSchema);