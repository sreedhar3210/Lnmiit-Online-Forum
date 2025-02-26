const mongoose = require('mongoose');

const otpNode = (userEmail, otp) => {

	return({
		"userEmail": userEmail,
		"otp": otp
	});
}

module.exports = otpNode;