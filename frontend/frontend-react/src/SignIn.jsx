import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './css/SignIn.css'; // Importing CSS file

const SignIn = () => {
	const navigate = useNavigate();
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [isFormSubmitted, setIsFormsubmitted] = useState(false);

	const handleOnSubmit = () => {
		setIsFormsubmitted(true);
	};

	useEffect(() => {
		if (isFormSubmitted) {
			const verifyCredentials = async () => {
				let options = {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json'
					},
					body: JSON.stringify({
						username: username,
						password: password
					})
				};

				let res = await fetch('http://localhost:8080/api/verify-login-details', options);
				let resData = await res.json();

				if (resData.validLogin) {
					localStorage.setItem('Username', username);
					localStorage.setItem('UserId', resData.userId);
					navigate('/');
				} else {
					alert('Invalid login credentials.');
					setIsFormsubmitted(false);
				}
			};

			verifyCredentials();
		}
		// eslint-disable-next-line
	}, [isFormSubmitted]);

	return (
	    <div className="signin-container">
	        <h2 className="signin-title">Sign In</h2>

	        <div className="signin-field">
	            <label className="signin-label">Username</label>
	            <input
	                type="text"
	                value={username}
	                onChange={(event) => setUsername(event.target.value)}
	                className="signin-input"
	                placeholder="Enter your username"
	            />
	        </div>

	        <div className="signin-field">
	            <label className="signin-label">Password</label>
	            <input
	                type="password"
	                value={password}
	                onChange={(event) => setPassword(event.target.value)}
	                className="signin-input"
	                placeholder="Enter your password"
	            />
	        </div>

	        <button type="submit" onClick={handleOnSubmit} className="signin-button">
	            Sign In
	        </button>

	        <div className="signup-link">
	            Not a member? <a href="http://localhost:3000/signup">Sign Up</a>
	        </div>
	    </div>
	);

};

export default SignIn;
