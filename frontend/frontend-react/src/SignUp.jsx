import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

const SignUp = () => {

	const navigate = useNavigate();
	const [username, setUsername] = useState('');
	const [email, setEmail] = useState('');
	const [firstName, setFirstName] = useState('');
	const [lastName, setLastName] = useState('');
	const [selectedDate, setSelectedDate] = useState(null);
	const [password, setPassword] = useState('');
	const [readyToSubmit, setReadyToSubmit ] = useState(false);
	const [isCheckingOtp, setIsCheckingOtp] = useState(false);

	const handleOnSubmit = () => {
		console.log('>>> username is ', username);
		console.log('>>> email is ', email);
		console.log('>>> firstName is ', firstName);
		console.log('>>> lastname is ', lastName);
		console.log('>>> selectedDate is ', selectedDate);
		console.log('>>> password is ', password);
		setReadyToSubmit(true);
	};

	useEffect(() => {
		if(readyToSubmit){
			let options = {
              method: "POST",
              headers: {
                "Content-Type": "application/json"
              },
              body: JSON.stringify({
                username: username,
                email: email,
                firstName: firstName,
                lastName: lastName,
                selectedDate: selectedDate,
                password: password
              }),
            }
          
            fetch('http://localhost:8080/api/send-verification-email', options)
            .then((res) => {
                setReadyToSubmit(false);
                setIsCheckingOtp(true);
			})
		}
		// eslint-disable-next-line
	}, [readyToSubmit]);

	return (
		<div>
			<p>From signup page.</p>

			<input
				type="text"
				value={username}
				onChange={(event) => setUsername(event.target.value)}
				placeholder="Username"
				label="Username"
			/>

			<input
				type="text"
				value={email}
				onChange={(event) => setEmail(event.target.value)}
				placeholder="Email"
			/>

			<div>
				<input
					type="text"
					value={firstName}
					onChange={(event) => setFirstName(event.target.value)}
					placeholder="First Name"
				/>

				<input
					type="text"
					value={lastName}
					onChange={(event) => setLastName(event.target.value)}
					placeholder="Last Name"
				/>
			</div>

			<div>
				<label>Birthdate</label>
				<DatePicker
					selected={selectedDate}
					onChange={(date) => setSelectedDate(date)}
					dateFormat="dd/MM/yyyy"
					showYearDropdown
					scrollableMonthYearDropdown
				/>
			</div>

			<input
				type="password"
				value={password}
				onChange={(event) => setPassword(event.target.value)}
				placeholder="Password"
			/>

			<button type="submit" onClick={handleOnSubmit}>Sign Up</button>
		</div>
	);
};

export default SignUp;
