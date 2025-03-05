import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import './css/SignUp.css'; // Import the CSS file

const SignUp = () => {

    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [selectedDate, setSelectedDate] = useState(null);
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isFormSubmitted, setIsFormSubmitted] = useState(false);
    const [isCheckingOtp, setIsCheckingOtp] = useState(false);
    const [isOtpSubmitted, setIsOtpSubmitted] = useState(false);
    const [otp, setOtp] = useState(0);

    const emailValidation = (email) => {
        let isLnmiitEmail = email.length > 13 && email.slice(-13) === '@lnmiit.ac.in';
        if (!isLnmiitEmail) {
            alert('Please signup using lnmiit email only');
        }
        return isLnmiitEmail;
    };

    const passwordValidation = (password, confirmPassword) => {
        let pswdMeetsReqs = false;
        let areSame = password === confirmPassword;
        let hasLowerChar = /[a-z]/.test(password);
        let hasUpperChar = /[A-Z]/.test(password);
        let hasNum = /[0-9]/.test(password);
        let hasSpecialChar = /[^a-zA-Z0-9]/.test(password);
        if (password.length < 8) {
            alert('Password length should atleast be 8');
        } else if (!areSame) {
            alert('Password and Confirm Password shall be same.');
        } else if (!hasLowerChar || !hasUpperChar || !hasNum || !hasSpecialChar) {
            alert('Password must contain the following atleast one Lower Character, Upper Character, Number, SpecialCharacter');
        } else pswdMeetsReqs = true;
        return pswdMeetsReqs;
    };

    const handleFormSubmit = () => {
        const validationResult = emailValidation(email) && passwordValidation(password, confirmPassword);
        console.log('>>>> user validation status is ', validationResult);
        setIsFormSubmitted(validationResult);
    };

    const handleOtpSubmit = () => {
        setIsOtpSubmitted(true);
    };

    useEffect(() => {
        if (isFormSubmitted) {
            let checkIfUserExists = async () => {
                let options = {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        username: username,
                        email: email
                    }),
                };

                try {
                    let res = await fetch('http://localhost:8080/api/user-exists', options);
                    let resData = await res.json();
                    if (!resData.userExists) {
                        await sendEmail();
                    } else {
                        alert('User with entered username or email already exists');
                    }
                } catch (err) {
                    console.log('error checking if user exists ', err);
                }
            };

            let sendEmail = async () => {
                let options = {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        firstName: firstName,
                        lastName: lastName,
                        email: email
                    }),
                };
                try {
                    fetch('http://localhost:8080/api/send-verification-email', options)
                        .then((res) => {
                            setIsCheckingOtp(true);
                        });
                } catch (err) {
                    console.log('error sending verification email ', err);
                }
            };

            checkIfUserExists();
        }
        // eslint-disable-next-line
    }, [isFormSubmitted]);

    useEffect(() => {
        if (isOtpSubmitted) {
            let verifyOtp = async () => {
                let otpOptions = {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        email: email,
                        otp: otp
                    }),
                };

                try {
                    let res = await fetch('http://localhost:8080/api/verify-otp', otpOptions);
                    let resData = await res.json();
                    console.log('>>> inside otp useEffect, resData is ', resData);
                    if (resData.isVerified) {
                        await addUser();
                    } else {
                        alert('You have entered incorrect OTP, Please try again');
                        setIsFormSubmitted(false);
                        setIsOtpSubmitted(false);
                        setIsCheckingOtp(false);
                    }
                } catch (err) {
                    console.log('error verifying otp: ', err);
                }
            };

            let addUser = async () => {
                let userOptions = {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        username: username,
                        email: email,
                        firstName: firstName,
                        lastName: lastName,
                        birthDate: selectedDate,
                        password: password
                    }),
                };

                try {
                    fetch('http://localhost:8080/api/add-user', userOptions)
                        .then((res) => {
                            console.log('>>>> user is inserted succesfully');
                            navigate('/signin');
                        });
                } catch (err) {
                    console.log('error inserting user ', err);
                }
            };

            verifyOtp();
        }
    });

    return (
        <div className="signup-container">
            <div className={isCheckingOtp ? "hidden" : "signup-form"}>
                <h2 className="signup-title">Sign Up</h2>

                <div className="signup-field">
                    <label className="signup-label">Username</label>
                    <input
                        type="text"
                        value={username}
                        onChange={(event) => setUsername(event.target.value)}
                        placeholder="Enter your username"
                        className="signup-input"
                    />
                </div>

                <div className="signup-field">
                    <label className="signup-label">Email</label>
                    <input
                        type="text"
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                        placeholder="Enter your email"
                        className="signup-input"
                    />
                </div>

                <div className="name-fields">
                    <div className="signup-field">
                        <label className="signup-label">First Name</label>
                        <input
                            type="text"
                            value={firstName}
                            onChange={(event) => setFirstName(event.target.value)}
                            placeholder="First Name"
                            className="signup-input"
                        />
                    </div>

                    <div className="signup-field">
                        <label className="signup-label">Last Name</label>
                        <input
                            type="text"
                            value={lastName}
                            onChange={(event) => setLastName(event.target.value)}
                            placeholder="Last Name"
                            className="signup-input"
                        />
                    </div>
                </div>

                <div className="birthdate-field">
                    <label className="signup-label">Birthdate</label>
                    <DatePicker
                        selected={selectedDate}
                        onChange={(date) => setSelectedDate(new Date(date))}
                        dateFormat="dd/MM/yyyy"
                        showYearDropdown
                        scrollableMonthYearDropdown
                        className="signup-datepicker"
                    />
                </div>

                <div className="password-fields">
                    <div className="signup-field">
                        <label className="signup-label">Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(event) => setPassword(event.target.value)}
                            placeholder="Enter your password"
                            className="signup-input"
                        />
                    </div>

                    <div className="signup-field">
                        <label className="signup-label">Confirm Password</label>
                        <input
                            type="password"
                            value={confirmPassword}
                            onChange={(event) => setConfirmPassword(event.target.value)}
                            placeholder="Confirm your password"
                            className="signup-input"
                        />
                    </div>
                </div>

                <button type="submit" onClick={handleFormSubmit} className="signup-button">Sign Up</button>
            </div>

            <div className={isCheckingOtp ? "otp-form" : "hidden"}>
                <h2 className="otp-title">Enter OTP</h2>
                <div className="otp-field">
                    <label className="otp-label">OTP</label>
                    <input
                        type="number"
                        onChange={(event) => setOtp(event.target.value)}
                        placeholder="Enter OTP"
                        className="otp-input"
                    />
                </div>
                <button type="submit" onClick={handleOtpSubmit} className="otp-button">Submit</button>
            </div>

            <div className="signin-link">
                Already a member? <a href="http://localhost:3000/signin">Sign In</a>
            </div>
        </div>
    );

};

export default SignUp;