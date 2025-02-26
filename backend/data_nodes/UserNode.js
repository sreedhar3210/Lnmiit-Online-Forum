const userNode = (username, email, firstName, lastName, birthDate, password) =>{
	return({
		"userName": username,
		"userEmail": email,
		"firstName": firstName,
		"lastName": lastName,
		"birthDate": birthDate,
		"password": password
	});

}

module.exports = userNode;