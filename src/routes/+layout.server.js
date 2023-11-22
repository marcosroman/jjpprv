export async function load ({ cookies }) {
	const sessionId = cookies.get('session-id');

	return {
		user: 0
	}
}
