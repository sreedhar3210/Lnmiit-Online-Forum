const otpGenerator = () => {
	// Generate a 6-digit OTP
	const randomNum = Math.floor(100000 + Math.random() * 900000);

	return randomNum;
}

module.exports = {otpGenerator};