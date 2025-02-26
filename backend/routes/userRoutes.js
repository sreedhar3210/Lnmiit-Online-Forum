const express = require('express');
const router = express.Router();
const { 
	mongoInsertUser, 
	mongoIsThereUserWithUsernameOrUserEmail, 
	mongoCheckLoginDetails
} = require('../mongoDB_services/mongoUserActions');

const UserNode = require('../data_nodes/UserNode');

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
	const validCreds = await mongoCheckLoginDetails(data.username, data.password);
	res.status(200).json({ 
		success: true,
		validLogin: validCreds
	});
});

module.exports = router;