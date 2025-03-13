const nodemailer = require('nodemailer');
const path = require('path');
require('dotenv').config({path: path.resolve(__dirname, '../.env') });
const verificationOptions =  require('../email_templates/emailVerification');

const transporter = nodemailer.createTransport({
	service: 'gmail',
	host: 'smtp.gmail.com',
	port: 587,
	secure: false,
	auth: {
		user: process.env.GMAIL_USER,
		pass: process.env.GMAIL_APP_PASSWORD 
	},
});

const sendMail = async(transporter, options) => {
	await transporter.sendMail(options);
}

const sendVerificationEmail = async(firstName, lastName, email, otpKey) => {
	const options = verificationOptions(firstName, lastName, email, otpKey);
	await sendMail(transporter, options);
}

module.exports = sendVerificationEmail;