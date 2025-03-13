const express = require('express');
const router = express.Router();
const otpNode = require('../data_nodes/OtpNode');
const sendVerificationEmail = require('../utility_classes/sendEmails');
const { otpGenerator } = require('../utils');
const { mongoInsertOtp, mongoVerifyOtp } = require('../mongoDB_services/mongoOtpActions');

router.post('/send-verification-email', async(req, res) => {
	const data = req.body;
	const otpKey = otpGenerator();
	const otp = otpNode(data.email, otpKey);

	await sendVerificationEmail(data.firstName, data.lastName, data.email, otpKey);
	await mongoInsertOtp(data.email, otpKey);
	res.status(200).json({ success: true });
});

router.post('/verify-otp', async(req, res) => {
	const data = req.body;
	const otpExists = await mongoVerifyOtp(data.email, data.otp);
	res.status(200).json({
		success: true,
		isVerified: otpExists  
	});
})

module.exports = router;