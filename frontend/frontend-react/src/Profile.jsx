import React, { useState, useEffect} from "react";
import { useParams } from "react-router-dom";
import Navbar from './Navbar';
import './css/Profile.css';
import axios from 'axios';

const Profile = () => {

	const [user, setUser] = useState({
	    userName: '',
	    userEmail: '',
	    firstName: '',
	    lastName: '',
	    birthDate: '',
	    profileUrl: ''
	});
	const username = localStorage.getItem('Username');
	const { profileId } = useParams();
	const [file, setFile] = useState(null);
	const [isLoggedInUserProfile, setIsLoggedInUserProfile] = useState(username === profileId);
	const [isEditProfile, setIsEditProfile] = useState(false);
	
	// const suggestedUsers = [
	// 	{username: 'mike.mirzyanov', profilePicUrl: 'https://unsplash.com/photos/airplane-on-ground-surrounded-with-trees-G85VuTpw6jg'},
	// 	{username: 'Colleseum', profilePicUrl: 'https://unsplash.com/photos/gray-concrete-building-during-daytime-Q4g0Q-eVVEg'},
	// 	{username: 'mount.pikachu', profilePicUrl: 'https://unsplash.com/photos/aerial-photo-of-machu-picchu-peru-PO7CGnoDFUI'}
	// ];

	const handleFileChange = (event) => {
		setFile(event.target.files[0]);
	}

	const handleFileSubmit = async() => {
		console.log('>>> file on handleFileSubmit is ', file);
		try {
			const formData = new FormData();
			formData.append('image', file);
			formData.append('userId', localStorage.getItem('UserId'));
	      	const response = await axios.post('http://localhost:8080/api/upload-profile-picture', formData, {
	        	headers: {
	          		'Content-Type': 'multipart/form-data',
	        	},
	      	});
	      	console.log('Upload successful:', response.data);
	      	alert("upload successful");
	      	setIsEditProfile(false);
	    }catch (error) {
		    console.error('Upload failed:', error);
		    alert("upload failed");
	    }
	}

	const handleLogoutButton = () => {
		localStorage.removeItem('Username');
		localStorage.removeItem('UserId');
		window.location.reload();
	};

	//currently we are allowing to change only profile picture.
	const handleEditProfile = () => {
		setIsEditProfile(true);
	}

	useEffect(() => {
		let options = {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				username: profileId
			})
		};
		console.log('>>>> useEffect is called with profileId as ', profileId);

		//for fetching profile information and suggested users.
		fetch('http://localhost:8080/api/get-user-details', options)
		.then(res => res.json())
		.then(data => {
			console.log('>>> in profile.jsx data is ', data);
			setUser({
                userName: data[0].userName || '',
                userEmail: data[0].userEmail || '',
                firstName: data[0].firstName || '',
                lastName: data[0].lastName || '',
                birthDate: data[0].birthDate || '',
                profileUrl: data[0].profilePicUrl || ''
            });
		})
	// eslint-disable-next-line
	}, []);

	return(
	<div className="profile-container">
		<Navbar/>
		<h2 className="profile-title">My Profile Page</h2>

		<div className="profile-fields" hidden={isEditProfile}>
			<div className="profile-picure-container">
				<img src={user.profileUrl} alt="No bomma uploaded." className="profile-picure"/>
				<button onClick={handleEditProfile}>Edit profile</button>
			</div>
			<div className="profile-field">
				<label htmlFor="Username" className="profile-label">Username:</label>
				<input
					type="text"
					id="Username"
					className="profile-input"
					value={user.userName}
					readOnly
				/>
			</div>

			<div className="profile-field">
				<label htmlFor="Email" className="profile-label">Email:</label>
				<input
					type="text"
					id="Email"
					className="profile-input"
					value={user.userEmail}
					readOnly
				/>
			</div>

			<div className="profile-field">
				<label htmlFor="FirstName" className="profile-label">First Name:</label>
				<input
					type="text"
					id="FirstName"
					className="profile-input"
					value={user.firstName}
					readOnly
				/>
			</div>

			<div className="profile-field">
				<label htmlFor="LastName" className="profile-label">Last Name:</label>
				<input
					type="text"
					id="LastName"
					className="profile-input"
					value={user.lastName}
					readOnly
				/>
			</div>

			<div className="profile-field">
				<label htmlFor="BirthDate" className="profile-label">Birth Date:</label>
				<input
					type="text"
					id="BirthDate"
					className="profile-input"
					value={user.birthDate}
					readOnly
				/>
			</div>

			<div className="profile-field">
				<label htmlFor="Contribution" className="profile-label">Contribution:</label>
				<input
					type="number"
					id="Contribution"
					className="profile-input"
					value={user.Contribution}
					readOnly
				/>
			</div>

			<div hidden={!isLoggedInUserProfile}>
				<button onClick={handleLogoutButton}>Logout</button>
			</div>
		</div>

		<div hidden={!isEditProfile}>
			{/*for adding profile picture.*/}
			<input
				type="file"
				id="file"
				onChange={handleFileChange}
			/>
			<button onClick={handleFileSubmit}>Upload</button>
		</div>
	</div>
)


}

export default Profile;