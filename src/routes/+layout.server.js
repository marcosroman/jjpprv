export async function load ({ cookies }) {
	const userId = cookies.get('userId');

	return { userId };
	/*
	const sessionId = cookies.get('session-id');

	return {
		user: 0
	}
	*/
}
