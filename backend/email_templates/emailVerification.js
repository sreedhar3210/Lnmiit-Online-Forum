require('dotenv').config();

const verificationOptions = (firstName, lastName, email, otpKey) => {	

	const htmlBody = `
		<p>Dear ${firstName} ${lastName},</p>
		<br>
		<p>We hope you're doing well. This email is to verify your email address for LNMIIT Online Forum.</p>
		<p>Your One-Time Password (OTP) for verification is: <strong>${otpKey}</strong></p>
		<p>Please do not share this OTP with anyone.</p>
		<p>If you did not request this verification, please ignore this email.</p>
		<br>
		<p>Best regards,</p>
		<p><strong>LNMIIT Online Forum Team</strong></p>
	`;

	return {
		from: {
			name: 'LNMIIT Online Forum',
			address: process.env.GMAIL_USER
		},
		to: email,
		subject: 'Email Verification',
		html: htmlBody,
	};
};

module.exports = verificationOptions;
