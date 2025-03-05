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
	const user = await User.findOne({ userName: username, password: password});
	let res = { 
		"userExists": user !== null, 
		"userId": user?._id || null
	};
	console.log('>>>> in mongoUserActions.js response is ', res);
	return res;
}

const mongoGetUserWithUsername = async(username) => {
	const user = await User.find({userName: username});
	console.log('>>>>> in mongoUserWithUsername, fetched user is ', user);
	return user;
}

module.exports = { mongoInsertUser, mongoIsThereUserWithUsernameOrUserEmail, mongoCheckLoginDetails, mongoGetUserWithUsername };