const User = require('../mongoDB_models/User');

const mongoIsThereUserWithUsernameOrUserEmail = async(username, useremail) => {
	const users = await User.find({
		"$or": [
			{"userName": username},
			{"userEmail": useremail}
		]
	});
	console.log('>>>>> in mongoUserActions userWithUsernameorEmail is ', users);
	return users.length > 0;
}

const mongoInsertUser = async(user) => {
	const newUser = User(user);
	await newUser.save();
}

const mongoCheckLoginDetails = async(username, password) => {
	const users = await User.find({ userName: username, password: password});
	return users.length > 0;
}

module.exports = { mongoInsertUser, mongoIsThereUserWithUsernameOrUserEmail, mongoCheckLoginDetails };