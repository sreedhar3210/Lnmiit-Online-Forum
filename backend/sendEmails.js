const nodemailer = require('nodemailer');
require('dotenv').config();
const verificationOptions =  require('./email_templates/emailVerification');

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

const sendVerificationEmail = async(firstName, lastName, email) => {
	const options = verificationOptions(firstName, lastName, email);
	await sendMail(transporter, options);
}

module.exports = sendVerificationEmail;