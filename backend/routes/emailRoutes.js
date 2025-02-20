const express = require('express');
const router = express.Router();

const sendVerificationEmail = require('../sendEmails');

router.post('/send-verification-email', async(req, res) => {
	const data = req.body;

	await sendVerificationEmail(data.firstName, data.lastName, data.email);
	res.status(200).json({ success: true });
});

module.exports = router;