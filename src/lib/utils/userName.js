function userNameString(userObject) {
	if (userObject) {
		return `${userObject.title} ${userObject.firstName} ${userObject.lastName}`;
	} else {
		return "(indefinido)";
	}
}

export default userNameString;

