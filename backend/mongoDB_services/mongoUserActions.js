const User = require('../mongoDB_models/User');

const formatUser = (user) => {
	return({
		"Id": user._id,
		"Username": user.userName,
		"ProfilePicUrl": user.profilePicUrl
	})
}

const mongoIsThereUserWithUsernameOrUserEmail = async(username, useremail) => {
	const users = await User.find({
		"$or": [
			{"userName": username},
			{"userEmail": useremail}
		]
	});
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
	return res;
}

const mongoUpsertProfilePicture = async(userId, profileUrl) => {
	await User.updateOne(
        { _id: userId },
        { $set: { profilePicUrl: profileUrl } } // Only update the ProfileUrl field
    );
}

const mongoGetUserWithUsername = async(username) => {
	const user = await User.find({userName: username});
	return user;
}

const mongoFetchUsers = async() => {
	const usersList = await User.find();
	var formattedUsersList = [];
	usersList.forEach((user) => {
		let formattedUser = formatUser(user);
		formattedUser.Id = String(formattedUser.Id);
		formattedUsersList.push(formattedUser);
	});
	return formattedUsersList;
}

module.exports = { 
	mongoInsertUser, 
	mongoIsThereUserWithUsernameOrUserEmail,
	mongoCheckLoginDetails, 
	mongoUpsertProfilePicture,
	mongoGetUserWithUsername,
	mongoFetchUsers
};