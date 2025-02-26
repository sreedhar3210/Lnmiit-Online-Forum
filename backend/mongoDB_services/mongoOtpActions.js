const Otp = require('../mongoDB_models/Otp');

const mongoInsertOtp = async(userEmail, otp) => {

	await Otp.findOneAndUpdate(
				{ userEmail: userEmail },
				{ $set: {otp: otp} },
				{ upsert: true});
}

const mongoVerifyOtp = async(userEmail, otpKey) => {
	const otps = await Otp.find(
		{ userEmail: userEmail,
		  otp: otpKey});
	console.log('>>>> in mongoOtpActions, otps matching userEmail and otp are ', otps);
	return otps.length > 0;
}

module.exports = { mongoInsertOtp, mongoVerifyOtp };