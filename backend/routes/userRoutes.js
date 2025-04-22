const express = require('express');
const router = express.Router();
const { 
	mongoInsertUser, 
	mongoIsThereUserWithUsernameOrUserEmail, 
	mongoCheckLoginDetails,
	mongoGetUserWithUsername,
	mongoUpsertProfilePicture
} = require('../mongoDB_services/mongoUserActions');
const UserNode = require('../data_nodes/UserNode');
const { handleFileUpload, uploadFile } = require('../utility_classes/uploadFiles');

router.post('/user-exists', async(req, res) => {
	let data = req.body;
	const userExists = await mongoIsThereUserWithUsernameOrUserEmail(data.username, data.email);
	console.log('>>>> userExists in userRoutes is ', userExists);
	res.status(200).json({ 
		success: true,
		userExists: userExists
	});
});

router.post('/add-user', async(req, res) => {
	let data = req.body;
	const user = UserNode(data.username, data.email, data.firstName, data.lastName,
							data.birthDate, data.password);
	console.log('>>>> from userRoutes.js the user we are creating is ', user);
	await mongoInsertUser(user);
	res.status(200).json({ success: true });
});

router.post('/verify-login-details', async(req, res) => {
	let data = req.body;
	const result = await mongoCheckLoginDetails(data.username, data.password);
	res.status(200).json({ 
		success: true,
		validLogin: result.userExists,
		userId: result.userId
	});
});

router.post('/get-user-details', async(req, res) => {
	console.log('>>>> got till here');
	let data = req.body;
	const user = await mongoGetUserWithUsername(data.username);
	res.send(user);
});

router.post('/upload-profile-picture', handleFileUpload, async(req, res) => {
	const userId = req.body.userId;
	console.log('>>>> in userRoutes upload profile pics method userId is ', userId);

	//passing this async function as parameter
	uploadFile(req, res, async(uploadRes) => {
		if(uploadRes){
			console.log('>>>>> response got to this call back function is ', uploadRes);
			if(uploadRes.success){
				await mongoUpsertProfilePicture(userId, uploadRes.imageUrl);
				console.log('>>>> success grand success');
				res.send({ success: true })
			}
		}
	});
	
});

module.exports = router;